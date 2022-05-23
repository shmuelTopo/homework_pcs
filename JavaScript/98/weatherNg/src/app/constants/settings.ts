import { Option } from "../models/options";

export const languages: Option[] = [
  {
    label: 'English',
    value: 'en'
  },
  {
    label: 'Hebrew',
    value: 'he'
  },
  {
    label: 'Spanish',
    value: 'es'
  },
  {
    label: 'French',
    value: 'fr'
  }
];

export const temperatures: Option[] = [
  {
    label: 'Fahrenheit',
    value: 'imperial'
  },
  {
    label: 'Celsius',
    value: 'metric'
  }
];
