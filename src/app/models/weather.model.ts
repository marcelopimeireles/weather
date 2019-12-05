import { addHours, format, isAfter } from 'date-fns';
import { IWeather } from '../interfaces/weather';
import { ITemperature } from '../interfaces/temperature';

export class Weather {
  public id: number;
  public city: string;
  public temperature: ITemperature;
  public icon: string;
  public windspeed: number;
  public timezone: number;
  public localTime: string;
  public weeklyDate: string;

  constructor(data: IWeather) {
    Object.assign(this, data);
    this.temperature.current = Math.round(this.temperature.current);
    this.temperature.min = Math.round(this.temperature.min);
    this.temperature.max = Math.round(this.temperature.max);
    this.setLocalTime();
  }

  private setLocalTime(): void {
    const date: Date = this.getTimezone(new Date());
    this.localTime = format(date, 'HH:mm');
  }

  private getTimezone(date: Date): Date {
    const currentTz = -date.getTimezoneOffset() * 60;
    const cityTz = this.timezone;
    const diff = (cityTz - currentTz) / 3600;

    return addHours(date, diff);
  }

  public getLocalWeeklyTime(): string {
    const date = new Date(this.weeklyDate);
    return format(date, 'HH:mm');
  }

  public checkWeeklyTimeout(): boolean {
    const date = new Date(this.weeklyDate);
    const dateTz = this.getTimezone(new Date());
    const timeout: boolean = isAfter(date, dateTz);

    return timeout;
  }
}

export class WeatherFactory {
  static create(data: IWeather): Weather {
    return new Weather(data);
  }
}
