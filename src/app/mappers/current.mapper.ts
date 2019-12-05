import { Mapper } from './mapper.interface';
import { IWeather } from '../interfaces/weather';

export class CurrentMapper extends Mapper<IWeather> {
  private readonly MAP = {
    id: 'id',
    name: 'city',
    'weather[0].icon': 'icon',
    'wind.speed': 'windspeed',
    'sys.timezone': 'timezone',
    'main.temp': 'temperature.current',
    'main.temp_min': 'temperature.min',
    'main.temp_max': 'temperature.max'
  };

  public map(src): IWeather {
    return this.create(src, this.MAP);
  }
}
