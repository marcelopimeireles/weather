import { Component } from '@angular/core';
import { format,  } from 'date-fns'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string;
  public date: Date;
  public formattedDate: string;
  public isDay: boolean;
  public city: string;
  public cityBgClass: string;


  constructor(){
    this.title = 'W€ATHER';
    this.date = new Date();
    this.formattedDate = format(this.date, 'PPPP');
    this.isDay = this.checkIfIsDay(this.date);
    this.city = 'lisbon';
    this.cityBgClass = `${this.city}-bg`;
  }

  private checkIfIsDay (date) {
    const [hour, period] = format(date, 'HH a').split(" ");
    const morning = ((Number(hour) >= 6 || Number(hour) !== 12) && period === 'AM');
    const afternoon = ((Number(hour) <= 6 || Number(hour) === 12) && period === 'PM');
    return (morning || afternoon);
  }
}
