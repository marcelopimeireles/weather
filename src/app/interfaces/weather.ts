import { ITemperature } from './temperature';

export interface IWeather {
  id: number;
  city: string;
  temperature: ITemperature;
  icon: string;
  windspeed: number;
  timezone: number;
}
