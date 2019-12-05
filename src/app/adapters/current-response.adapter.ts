import { Adapter } from './adapter.interface';
import { Weather, WeatherFactory } from '../models/weather.model';
import { IWeather } from '../interfaces/weather';
import { Mapper } from '../mappers/mapper.interface';
import { CurrentMapper } from '../mappers/current.mapper';
import { schema } from '../schemas/weekly-response.schema';

export class CurrentResponseAdapter extends Adapter<Weather[]> {
  public adapt(response): Weather[] {
    this.checkSchema(response, schema);
    const currentWeathers: Weather[] = [];
    const list = [...response[0].list];

    if (response.length === 2) {
      list.push(...response[1].list);
    }

    list.forEach(current => {
      const mapper: Mapper<IWeather> = new CurrentMapper();
      const objectMapper: IWeather = mapper.map(current);
      currentWeathers.push(WeatherFactory.create(objectMapper));
    });

    return currentWeathers;
  }
}
