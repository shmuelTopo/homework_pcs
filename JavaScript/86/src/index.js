import Ant from './ant';
import { drawRotatedImage, resizeCanvas } from './helperFunctions';
import antHoleSrc from './images/antHole.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import './css/style.css';

const ANT_HOLE = new Image();
ANT_HOLE.src = antHoleSrc;



//When the browser changes size change the canvas size
window.addEventListener('resize', resizeCanvas);

//First time (even without the window being resiezed)
resizeCanvas();

export const ants = Ant.fromStorage(localStorage.getItem('ants')) || [];
//export const ants = [];

if(ANT_HOLE.complete){
    moveAnts();
} else {
    ANT_HOLE.addEventListener('load', moveAnts);
}

let antsIntervals;
let moveIntervals;

let antsSpeed = 20;
let antsRate = 150;

const antsSpeedInput = $('#antsSpeed');
const antsRateInput = $('#antsRate');
console.log(antsSpeedInput);
console.log(antsRateInput);


antsSpeedInput.on('change', function(){
    antsSpeed = getSpeedIntervals(parseInt(antsSpeedInput.val()));
    console.log(antsSpeed);
    updateInputs();
});

antsRateInput.on('change', function(){
    antsRate = getRangeIntervals(parseInt(antsRateInput.val()));
    console.log(antsRate);
    updateInputs();
});

function updateInputs() {
    if($('#startPause').text() === 'Pause'){
        stop();
        start();
    }
}

$('#startPause').on('click', () => {
    if($('#startPause').text() === 'Start'){
        start();
    } else {
        stop();
    }
});

function start() {
    $('#startPause').text('Pause');

    antsIntervals = setInterval(() => {
        createAnt();
    }, antsRate);

    //Set interval to redraw all the ants
    moveIntervals = setInterval(() => {
        moveAnts();
    }, antsSpeed);
}

function stop() {
    clearInterval(antsIntervals);
    clearInterval(moveIntervals);
    $('#startPause').text('Start');
}

$('#reset').on('click', () => {
    ants.length = 0;
    stop();
    clearAnts();
    localStorage.removeItem("ants");
});

function createAnt(){
    ants.push(new Ant(ants));
    const newAnt = {};
    Object.assign(newAnt, ants[0]);
}

function moveAnts(){
    //ctx.drawImage(ANT_HOLE, window.innerWidth / 2 - 45, window.innerHeight / 2 - 85 / 2, 100, 100);
    //Go through all the ants and draw their current position
    clearAnts();
    if(ants){
        ants.forEach(ant => ant.draw());
        localStorage.setItem('ants', Ant.toStorage(ants));
    }   
}

function clearAnts() {
    //Resize the canvas and by doing that you basically erasing all the ants

    resizeCanvas();

    //All the calculations as for where to draw the hole of the ants (I played around with the numbers)
    drawRotatedImage(ANT_HOLE, window.innerWidth / 2 - 50, window.innerHeight / 2 - 40, 180, 180, 180);
}


function multiply(a, b) {
    let total = 1;
    for(let i = 0; i < b; i++){
        total = total * a;
    }
    return total;
}

function getRangeIntervals(rangeInput) {
    console.log('Math', Math.pow(1.0038077, rangeInput));
    return Math.pow(1.0038077, rangeInput);
    //return multiply(1.0125, rangeInput);
}

function getSpeedIntervals(speedInput) {
    console.log('Math', Math.pow(1.0038077, speedInput));
    return Math.pow(1.057, speedInput);
    //return multiply(1.0125, rangeInput);
}

//console.log(multiply(1//.0125, ra));

