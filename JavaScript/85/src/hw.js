import $ from 'jquery';
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
}