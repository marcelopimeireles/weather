import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbCheckBox } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { ScaleComponent } from './components/scale/scale.component';
import { CurrentDateComponent } from './components/current-date/current-date.component';
import { DayBackgroundComponent } from './components/day-background/day-background.component';
import { CitiesPanelComponent } from './components/cities-panel/cities-panel.component';
import { ForecastCardComponent } from './components/forecast-card/forecast-card.component';

@NgModule({
  declarations: [
    AppComponent,
    ScaleComponent,
    CurrentDateComponent,
    DayBackgroundComponent,
    CitiesPanelComponent,
    ForecastCardComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule
  ],
  providers: [NgbCheckBox],
  bootstrap: [AppComponent]
})
export class AppModule { }
