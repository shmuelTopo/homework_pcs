import {getRandomNumber, getRandomDelta} from './helperFunctions';
import {isNearCenter, withinRange} from './helperFunctions';
import {getAngelFromXY, drawRotatedImage} from './helperFunctions';
import {removeAnt} from './index';
import {ANT_IMAGE} from './images';

export default class Ant {
    constructor() {
        //Position of ant on the canvas, at first position will be in the center
        this.x = window.innerWidth / 2;
        this.y = window.innerHeight / 2;

        this.size = 30;

        //Direction of ant heading vertically and horizontally (delta y and delta x) at first will default to 0
        //Later on code will generate random numbers between -DELTA_RANGE and DELTA_RANGE (i.e. between -5 and 5)
        //for example if dy is 2 and dx is -4 ant will move 2px down and 4px to the left every move
        this.resetDirection();
        this.everRested = false;
        this.draw();
    }

    resetDirection() {
        this.newDy = getRandomDelta(this.dy);
        this.newDx = getRandomDelta(this.dx);
        if(!this.everRested){
            this.dy = this.newDy;
            this.dx = this.newDx;
            this.everRested = true;
        }

        //Once every 30 - 60 moves ant direction get reset, every time the ant direction get reset 
        //the code makes a decision of how many moves until next reset takes place...
        this.numOfMovesToReset = getRandomNumber(30, 60);  
    }

    setNewDirection(dy, dx) {
        this.dy = dy;
        this.dx = dx;
    }

    nearCenter() {
        //check if ant is near the center
        return isNearCenter(this.y, this.x, 10);       
    }

    draw() {
        if(this.numOfMovesToReset === 0){
            this.resetDirection();
        }

        //Instead of abruptly changing the new dy/dx change it gradually. i.e. every time the direction is being reset
        //Don't change it at once, instead, change it gradually until the current y/x matches the newDy/x
        const diff = 0.2;
        
        //To prevent a bug when the current dy/dx is 0.1 close to the newDx/y the ant jumps back and forth 
        if(withinRange(this.newDy, this.dy, diff)){
            this.dy = this.newDy;
        }
        if(withinRange(this.newDx, this.dx, diff)){
            this.dx = this.newDx;
        }

        //If the newDy is more than current dy increase the current dy, if it's less decrease it 
        if(this.newDy > this.dy){
            this.dy += diff;
        } else if(this.newDy < this.dy){
            this.dy -= diff;
        }

        //Same for dx
        if(this.newDx > this.dx){
            this.dx += diff;
        } else if(this.newDx < this.dx){
            this.dx -= diff;
        }

        //If the ant is near the center and never been rested remove the ant
        if(this.nearCenter() && this.everRested){
            removeAnt(this);
        }

        //Set the position of the ant to the old position + the dy and dx
        this.x += this.dx;
        this.y += this.dy;

        //The code to bounce the ant if it hit the wall

        //Check the Right side
        if(this.x > (window.innerWidth + this.size)){
            this.dx = -Math.abs(this.dx);
        }

        //Check the Left side
        if(this.x < (0 - this.size)){
            this.dx = Math.abs(this.dx);
        }

        //Check the Bottom side
        if(this.y > (window.innerHeight + this.size)){
            this.dy = -Math.abs(this.dy);
        }

        //Check the Top side
        if(this.y < (0 -this.size)){
            this.dy = Math.abs(this.dy);
        }

        //And finally draw the ant to the screen with the right angel
        const angel = getAngelFromXY(this.dx, this.dy);
        drawRotatedImage(ANT_IMAGE, this.x, this.y, angel); 

        this.numOfMovesToReset -= 1;         
    }

    static toStorage(ants){
        if(ants.length === 0){
            return undefined;
        }
        return JSON.stringify(ants.map(ant => {
            const newAnt = {};
            Object.assign(newAnt, ant);
            return newAnt;
        }));
    }

    static fromStorage(jsonAnts){ 
        if(!jsonAnts || jsonAnts === 'undefined'){
            return undefined;
        }           
        return JSON.parse(jsonAnts).map(oldAnt => {
            const newAnt = new Ant();
            Object.assign(newAnt, oldAnt);
            return newAnt;
        });
    }
}
