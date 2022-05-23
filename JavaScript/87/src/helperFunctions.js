const DELTA_RANGE = 5;

export function getRandomNumber(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
}

export function isNearCenter(positionY, positionX, nearPx) {
    //nearPx - how many pixels do you consider "near"

    //Check where the center px is horizontaly and vertically and store the values
    const centerY = window.innerHeight / 2;
    const centerX = window.innerWidth / 2;

    //Check the different between the center position and positionX and positionY
    const diffY = centerY - positionY;
    const diffX = centerX - positionX;

    //return rather or not the diffX and diffY is less than nearPx
    return (Math.abs(diffY) < nearPx && Math.abs(diffX) < nearPx);
}

export function withinRange(num1, num2, range){
    //Check if 2 numbers are withing the range of each other
    return Math.max(num1, num2) - Math.min(num1, num2) <= range;
}

export function getRandomDelta(previousDelta){
    
    console.log(previousDelta);
    let number;
    let shouldLoop = true;

    while(shouldLoop){
        number = getRandomNumber(DELTA_RANGE, -DELTA_RANGE +1);

        if(!previousDelta){
            return number;
        }
        console.log('the number is', number);
        shouldLoop = false;

        console.log('number', number, 'previous', previousDelta, 'within range', withinRange(number, previousDelta, 3))
        if(number === 0 || !withinRange(number, previousDelta, 2)){
            shouldLoop = true;
        }
    }
    return number;
}

export function getAngelFromXY(dx, dy){
    return Math.atan2(dx, -dy) * 180 / Math.PI;
}

const TO_RADIANS = Math.PI/180; 

//Get the canvas element and the it's context
const canvas = document.getElementById('theCanvas');
const ctx = canvas.getContext('2d');

//Function to resize the canvas based of browser size
export function resizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

export function drawRotatedImage(image, x, y, angle, sizeX, sizeY){ 
    // save the current co-ordinate system 
    ctx.save(); 
    // move to the middle of where we want to draw our image
    ctx.translate(x, y);
    // rotate around that point, converting our angle from degrees to radians 
    ctx.rotate(angle * TO_RADIANS);
    // draw it up and to the left by half the width  and height of the image
    if(sizeX && sizeY){
        ctx.drawImage(image, -(image.width/2), -(image.height/2), sizeX, sizeY);
    } else {
        ctx.drawImage(image, -(image.width/2), -(image.height/2));
    }
    // and restore the co-ords to how they were when we began
    ctx.restore(); 
}





