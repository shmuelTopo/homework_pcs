import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherDto} from '../models/weather';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  baseUrl = 'https://api.openweathermap.org/data/2.5/weather?';
  appId = '4e013f6fa12ece3b83bf10a0900c8020';

  getWeather(zip: string, units?: string, lang?: string) {
    return this.http
      .get<WeatherDto>(
        `${this.baseUrl}zip=${zip}&units=${units || 'imperial'}&lang=${lang || 'en'}&appid=${this.appId}`
      )
      .pipe(
        switchMap((res) => {
          return of({
            city: res.name,
            temp: res.main.temp,
            description: res.weather[0].description,
            icon: 'https://openweathermap.org/img/wn/' + res.weather[0].icon + '@2x.png',
            zip: zip,
            lang: lang,
            units: units
          });
        })
      );
  }
}
