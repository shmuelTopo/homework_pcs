import { Component } from '@angular/core';
import { Option } from '../../models/options';
import { languages, temperatures } from '../../constants/settings';
import { setTemp, setLang } from '../settings';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  languages = languages;
  temperatures = temperatures;

  langChanged(value: Option) {
    console.log('the lang is', value);
    setLang(value.value);
  }

  tempChanged(value: Option) {
    console.log('the temp is', value);
    setTemp(value.value);
  }
}
