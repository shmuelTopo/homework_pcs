import {antsSpeedInput, antsRateInput} from './constant';

let antsSpeedInputValue;
let antsRateInputValue;
let antsSpeed;
let antsRate;
let defaultSpeedValue = localStorage.getItem('defaultSpeedValue') || antsSpeedInput.val();
let defaultRateValue = localStorage.getItem('defaultRateValue') || antsRateInput.val();

let start = localStorage.getItem('start') || false;

if(localStorage.getItem('antsSpeedInputValue')){
    antsSpeedInputValue = localStorage.getItem('antsSpeedInputValue');
    antsRateInputValue = localStorage.getItem('antsRateInputValue');
    antsSpeedInput.val(antsSpeedInputValue);
    antsRateInput.val(antsRateInputValue);
} else {
    antsSpeedInputValue = antsSpeedInput.val();
    antsRateInputValue = antsRateInput.val();
}

updateSpeed();
updateRate();

function getRangeIntervals(rangeInput) {
    return Math.pow(1.0038077, rangeInput);
}

export function updateStart() {
    start = true;
    saveSettings();
}

export function updateStop() {
    start = false;
    saveSettings();
}

export function isStart() {
    return start === 'true';
}

function getSpeedIntervals(speedInput) {
    return Math.pow(1.057, speedInput);
}

function saveSettings() {
    localStorage.setItem('antsSpeed', antsSpeed);
    localStorage.setItem('antsRate', antsRate);
    localStorage.setItem('start', start);
}

export function getSpeed() {
    return antsSpeed;
}

export function getRate() {
    return antsRate;
}

export function updateSpeed() {
    antsSpeedInputValue = antsSpeedInput.val();
    antsSpeed = getSpeedIntervals(antsSpeedInputValue);
    localStorage.setItem('antsSpeedInputValue', antsSpeedInputValue);
    saveSettings();
}

export function updateRate() {
    antsRateInputValue = antsRateInput.val();
    antsRate = getRangeIntervals(antsRateInputValue);
    localStorage.setItem('antsRateInputValue', antsRateInputValue);
    saveSettings();
}

export function resetSettings() {
    antsSpeedInput.val(defaultSpeedValue);
    antsRateInput.val(defaultRateValue);
    antsSpeedInputValue = defaultSpeedValue;
    antsRateInputValue = defaultRateValue;
    updateSpeed();
    updateRate();
}



