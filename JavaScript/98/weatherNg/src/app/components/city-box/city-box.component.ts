import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WeatherDetails } from '../../models/weather';
import { getFormatedTemp } from '../../shared/settings';

@Component({
  selector: 'app-city-box',
  templateUrl: './city-box.component.html',
  styleUrls: ['./city-box.component.scss']
})
export class CityBoxComponent {
  @Input() weatherDetails!: WeatherDetails;
  @Input() index!: number;
  @Output() removeCity = new EventEmitter<number>();

  clickRemove() {
    this.removeCity.emit(this.index);
    console.log('removing', this.index);
  }

  getTemp() {
    return getFormatedTemp(this.weatherDetails.temp);
  }
}
