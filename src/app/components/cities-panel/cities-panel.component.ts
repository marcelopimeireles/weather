import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Weather } from '../../models/weather.model';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-cities-panel',
  templateUrl: './cities-panel.component.html',
  styleUrls: ['./cities-panel.component.scss']
})
export class CitiesPanelComponent {
  private cities: number[];
  public weather$ = new BehaviorSubject<Weather[]>(null);
  public error = false;

  constructor(
              private apiService: ApiService,
              private toastService: ToastService
            ) {
    // this.cities = ['lisbon','madrid','london','paris', 'berlin'];
    this.cities = [2267057, 3117735, 2643743, 2988507, 2950159];
    this.getData();
  }

  private getData(): void {
    this.error = false;
    this.apiService.getAllCurrentWeathersByCity(this.cities).subscribe(
      response => this.weather$.next(response),
      error => {
        console.log(error)
        this.showDanger(error);
        this.error = true;
      }
    );
  }

  private showDanger(dangerTpl) {
    this.toastService.show(dangerTpl, { classname: 'bg-danger text-light', delay: 5000 });
  }
}
