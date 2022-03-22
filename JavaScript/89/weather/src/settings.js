const settings = {
    lang: 'en',
    temp: 'imperial',
    unitSymbol: 'F'
}

export const languages = [
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
]

export const temperature = [
    {
        label: 'Fahrenheit',
        value: 'imperial'
    },
    {
        label: 'Celsius',
        value: 'metric'
    }
]

export function changeSettings(id, value){
    if(!settings.hasOwnProperty(id)){
        alert('something is wrong, can\'t find the key');
    } else {
       settings[id] = value; 
       settings.temp === 'metric' ? settings.unitSymbol = 'C' : settings.unitSymbol = 'F';
    }
}

export function getTemp() {
    return settings.temp;
}

export function getLang() {
    return settings.lang;
}

export function getSymbol() {
    return settings.unitSymbol;
}