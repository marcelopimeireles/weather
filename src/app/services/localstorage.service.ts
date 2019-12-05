import { Injectable } from '@angular/core';
import { addMinutes, isAfter, getTime } from 'date-fns';
import { ICurrentWeatherLocalstorage, IWeatherLocalstorage } from '../interfaces/localstorage';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  constructor() {}

  public getAllCurrentWeathersByCity(cities: number[]): ICurrentWeatherLocalstorage {
    const localstorageObj: ICurrentWeatherLocalstorage = { stored: [], data: [] };
    cities.map(city => {
      const data = this.getCurrentWeatherByCity(city);
      if (data) {
        localstorageObj.stored.push(city);
        localstorageObj.data.push(data);
      }
    });
    return localstorageObj;
  }

  private getCurrentWeatherByCity(city: number): any {
    const key = 'current_' + city;
    return this.get(key);
  }

  public setCurrentWeather(data: any): void {
    data.forEach((city: any) => {
      const key = 'current_' + city.id;
      this.set(key, city);
    });
  }

  public removeCurrentWeather(cities: number[]): void {
    cities.forEach(city => {
      const key = 'current_' + city;
      localStorage.removeItem(key);
    });
  }

  public getWeeklyWeatherByCity(city: number): any {
    const key = 'weekly_' + city;
    return this.get(key);
  }

  public setWeeklyWeather(city: number, data: any): void {
    const key = 'weekly_' + city;
    this.set(key, data);
  }

  public removeWeeklyWeather(city: number): void {
    const key = 'weekly_' + city;
    localStorage.removeItem(key);
  }

  private get(key: string): any {
    const storedData: string = localStorage.getItem(key);

    if (storedData) {
      const data: IWeatherLocalstorage = JSON.parse(storedData);
      const isExpired: boolean = isAfter(new Date(), new Date(data.expiresIn));
      if (!isExpired) {
        return data.value;
      }
    }

    return null;
  }

  private set(key: string, data: any): void {
    const incrementHour = addMinutes(new Date(), 60);
    const expiresIn = getTime(incrementHour);
    localStorage.setItem(key, JSON.stringify({ value: data, expiresIn }));
  }
}
