import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { OptionsInputComponent } from './components/options-input/options-input.component';
import { ShowWeatherComponent } from './components/show-weather/show-weather.component';
import { InputWithRandomComponent } from './components/input-with-random/input-with-random.component';
import { CityBoxComponent } from './components/city-box/city-box.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    OptionsInputComponent,
    ShowWeatherComponent,
    InputWithRandomComponent,
    CityBoxComponent
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
