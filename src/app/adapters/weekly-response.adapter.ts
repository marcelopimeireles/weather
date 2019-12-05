import { Adapter } from './adapter.interface';
import { Weather, WeatherFactory } from '../models/weather.model';
import { IWeather } from '../interfaces/weather';
import { WeeklyMapper } from '../mappers/weekly.mapper';
import { Mapper } from '../mappers/mapper.interface';
import { schema } from '../schemas/weekly-response.schema';

export class WeeklyResponseAdapter extends Adapter<Weather[]> {
  public adapt(response): Weather[] {
    this.checkSchema(response, schema);

    const weeklyList: Weather[] = [];
    const weeklyObject = (({ list, ...others }) => ({ ...others }))(response);

    response.list.forEach(weekly => {
      weeklyObject.list = [weekly];
      const mapper: Mapper<IWeather> = new WeeklyMapper();
      const objectMapper: IWeather = mapper.map(weeklyObject);
      weeklyList.push(WeatherFactory.create(objectMapper));
    });

    return weeklyList;
  }
}
