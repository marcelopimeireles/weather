import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, forkJoin, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Weather } from '../models/weather.model';
import { LocalstorageService } from './localstorage.service';
import { ICurrentWeatherLocalstorage } from '../interfaces/localstorage';
import { CurrentResponseAdapter } from '../adapters/current-response.adapter';
import { WeeklyResponseAdapter } from '../adapters/weekly-response.adapter';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private WEEKLY_BASE_URL = `${environment.api.baseURL}forecast?appid=${environment.api.key}`;
  private CURRENT_BASE_URL = `${environment.api.baseURL}group?appid=${environment.api.key}`;
  private UNITS = 'metric';

  constructor(private http: HttpClient,
              private LocalstorageService: LocalstorageService) {}

  public getAllCurrentWeathersByCity(cities: number[]): Observable<Weather[]> {
    const storedCities: ICurrentWeatherLocalstorage = this.LocalstorageService.getAllCurrentWeathersByCity(
      cities
    );
    const notStoredCities: number[] = cities.filter(
      city => !storedCities.stored.includes(city)
    );
    const forkData: any[] = [of(storedCities)];

    if (notStoredCities.length) {
      const URI = `${this.CURRENT_BASE_URL}&id=${notStoredCities}&units=${this.UNITS}`;
      forkData.push(this.http.get(URI));
    }

    return forkJoin(forkData).pipe(
      tap(response => {
        if (notStoredCities.length) {
          this.LocalstorageService.setCurrentWeather(response[1].list);
        }
      }),
      map(this.adaptCurrentResponse),
      catchError(err => {
        if (notStoredCities.length) {
          this.LocalstorageService.removeCurrentWeather(notStoredCities);
        }
        return throwError(err);
      })
    );
  }

  public getWeeklyWeatherByCity(city: number): Observable<Weather[]> {
    const stored = this.LocalstorageService.getWeeklyWeatherByCity(city);
    const URI = `${this.WEEKLY_BASE_URL}&id=${city}&units=${this.UNITS}`;
    let res;

    if (stored) {
      res = of(stored).pipe(map(this.adaptWeeklyResponse));
    } else {
      res = this.http.get(URI).pipe(
        tap(response => this.LocalstorageService.setWeeklyWeather(city, response)),
        map(this.adaptWeeklyResponse),
        catchError(err => {
          this.LocalstorageService.removeWeeklyWeather(city);
          return throwError(err);
        })
      );
    }

    return res;
  }

  private adaptCurrentResponse(response: any): Weather[] {
    const adapter: CurrentResponseAdapter = new CurrentResponseAdapter();
    return adapter.adapt(response);
  }

  private adaptWeeklyResponse(response: any): Weather[] {
    const adapter: WeeklyResponseAdapter = new WeeklyResponseAdapter();
    return adapter.adapt(response);
  }
}
