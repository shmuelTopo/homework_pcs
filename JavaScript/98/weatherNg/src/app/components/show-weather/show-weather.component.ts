import { Component } from '@angular/core';
import usZips from 'us-zips/array';
import { WeatherDetails } from '../../models/weather';
import { WeatherService } from '../../services/weather.service';
import { getLang, getTemp } from '../../shared/settings';

@Component({
  selector: 'show-weather',
  templateUrl: './show-weather.component.html',
  styleUrls: ['./show-weather.component.scss']
})
export class ShowWeatherComponent {
  weatherRequests: WeatherDetails[] = [];

  constructor(private WeatherService: WeatherService) {}

  getRandomZipCode() {
    const index = Math.floor(Math.random() * usZips.length) - 1;
    return usZips[index].zipCode;
  }

  removeCityWeather(index: number) {
    this.weatherRequests.splice(index, 1);
  }

  newZipCode(zip: string) {
    console.log('new zip added', zip);
    this.WeatherService.getWeather(zip, getTemp(), getLang()).subscribe((weather) => {
      console.log('got weather', weather as WeatherDetails);
      this.weatherRequests.push(weather as WeatherDetails);
    });
  }
}
