let temp = 'imperial';
let lang = 'en';

export function setTemp(value: string) {
  temp = value;
}

export function setLang(value: string) {
  lang = value;
}

export function getTemp() {
  return temp;
}

export function getLang() {
  return lang;
}

export function getSymble() {
  return temp === 'imperial' ? 'F' : 'C';
}

export function getFormatedTemp(temp: number) {
  return temp.toFixed(1) + getSymble();
}
