import { Component } from '@angular/core';
import { format } from 'date-fns'

@Component({
  selector: 'app-current-date',
  templateUrl: './current-date.component.html',
  styleUrls: ['./current-date.component.scss']
})
export class CurrentDateComponent {
  date: Date;
  calendar: string[];

  constructor() {
    this.date = new Date();
    this.calendar = format(this.date, `iii dd MMM yy '@' HH a`).split(' ');
  }
}
