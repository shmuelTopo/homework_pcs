export interface WeatherDto {
  main: {
    temp: number;
  },
  name: string,
  weather: WeatherDetailsDto[]
}

export interface WeatherDetailsDto {
  description: string;
  icon: string;
}

export interface WeatherDetails {
  city: string;
  temp: number;
  description: string;
  icon: string;
  zip: string;
  lang: string;
  units: string;
}
