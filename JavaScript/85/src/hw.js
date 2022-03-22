import $ from 'jquery';
<<<<<<< HEAD
import './css/style.css';
import BackImg from '../images/painting.jpeg';

let counter = 0;
$('h1').text('My Jquery Website');
$('main div').append('<br><p>Click the button to change the background color</p>');

$(document.body).css("background-image", "url(" + BackImg + ")");

const theButton = $('#theButton');
theButton.on('click', () =>{
    $('#timeChanged').text(counter++);
    $('main').css('background-color', randomColor(30));
    $('main div').css('background-color', randomColor(70));
});

theButton.trigger('click');

function randomColor (opacity){
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    return opacity ? "#" + randomColor + fromPercent(opacity) : "#" + randomColor;
}

function fromPercent(valNum) {
    let decimalValue = Math.round(valNum * 255 / 100);
    let hexValue = decimalValue.toString(16).toUpperCase();
    return valNum < 7 ? "0" + hexValue : hexValue;
=======
//import './css/style.css';
import Painting from '../images/painting.jpeg';

let counter = 0;
$('h1').text('My Jquery Website');
$('main').append('<p>Click the button to change the background color</p>');

console.log('Painting: ', Painting);
$(document.body).css("background-image", "url(" + Painting + ")");
$('#theButton').on('click', () =>{
    $('#timeChanged').text(++counter);
    console.log('Button Clicked');
    $('main').css('background-color', randomColor());
});

function randomColor (){
    //No idea how it works but it preducts a random hash code color
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    return "#" + randomColor + "80";
>>>>>>> bb9d62a495e662653b543f6452bf87a66cc00d28
}