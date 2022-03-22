import $ from 'jquery';
import Ant from './ant';

export const antsSpeedInput = $('#antsSpeed');
export const antsRateInput = $('#antsRate');
export const ants = Ant.fromStorage(localStorage.getItem('ants')) || [];