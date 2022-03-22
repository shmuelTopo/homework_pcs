import Ant from './ant';
import { drawRotatedImage, resizeCanvas } from './helperFunctions';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import './css/style.css';
import {antsSpeedInput, antsRateInput, ants} from './constant';
import {getSpeed, getRate, updateSpeed, updateRate, resetSettings, updateStart, updateStop, isStart} from './settings';
import {ANT_HOLE} from './images';

//Resize the Canvas to match the window size
resizeCanvas();

//When the browser changes size change the canvas size
window.addEventListener('resize', resizeCanvas);

//Draw the ants onto the screen
if(ANT_HOLE.complete){
    drawAnts();
} else {
    ANT_HOLE.addEventListener('load', drawAnts);
}

let antsIntervals;
let moveIntervals;

antsSpeedInput.on('change', function(){
    //Update the speed according to the input
    updateSpeed();
    //Make sure the update take affect in the GUI
    updateRateAndSpeed();
});

antsRateInput.on('change', function(){
    //Same for Rate
    updateRate();
    updateRateAndSpeed();
});

if(isStart()){
    start();
}


function updateRateAndSpeed() {
    if($('#startPause').text() === 'Pause'){
        //restart the set intervals to use the new value
        stop();
        start();
    }
}

$('#startPause').on('click', () => {
    if($('#startPause').text() === 'Start'){
        start();
        updateStart();
    } else {
        stop();
        updateStop();
    }
});

function start(firstTime) {
    $('#startPause').text('Pause');
    
    if(!firstTime){
       updateStart(); 
    }

    //Set interval to create ants and 
    antsIntervals = setInterval(() => {
        createAnt();
       //set the intervals time to be the one found in the settings module
    }, getRate());

    //Set interval to redraw all the ants
    moveIntervals = setInterval(() => {
        drawAnts();
    }, getSpeed());
}

function stop() {
    updateStop();
    clearInterval(antsIntervals);
    clearInterval(moveIntervals);
    $('#startPause').text('Start');
}

$('#reset').on('click', () => {
    ants.length = 0;
    stop();
    clearAnts();
    localStorage.removeItem("ants");
    resetSettings();
});

function createAnt(){
    ants.push(new Ant(ants));
    const newAnt = {};
    Object.assign(newAnt, ants[0]);
}

function drawAnts(){
    //Go through all the ants and draw their current position
    clearAnts();
    if(ants){
        ants.forEach(ant => ant.draw());
        localStorage.setItem('ants', Ant.toStorage(ants));
    }   
}

function clearAnts() {
    //Resizing canvas deletes all the ants
    resizeCanvas();

    //All the calculations as for where to draw the hole of the ants (I played around with the numbers)
    drawRotatedImage(ANT_HOLE, window.innerWidth / 2 - 50, window.innerHeight / 2 - 40, 180, 180, 180);
}

export function removeAnt(ant){
    const index = ants.indexOf(ant);
    if (index > -1) {
        ants.splice(index, 1);
    }
}




