import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-day-background',
  templateUrl: './day-background.component.html',
  styleUrls: ['./day-background.component.scss']
})
export class DayBackgroundComponent implements OnInit {
  @Input() isDay: boolean;

  constructor() {
  }

  ngOnInit() {
  }

}
