(function() {
    'use strict';

    //Get the cavas element and the it's context
    const canvas = document.getElementById('theCanvas');
    const ctx = canvas.getContext('2d');

    const ANT_IMAGE = document.getElementById('antImage');
    const ANT_HOLE = document.getElementById('antHole');

    //How many pixel does the ant move every time
    const DELTA_RANGE = 5;

    //Function to resize the canvas based oof browser size
    function resizeCanvas(){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    //When the browser changes size change the canvas size
    window.addEventListener('resize', resizeCanvas);

    //First time (even without the window being resiezed)
    resizeCanvas();

    class Ant {
        constructor() {
            //Position of ant on the canvas, at first position will be in the center
            this.x = window.innerWidth / 2;
            this.y = window.innerHeight / 2;

            this.size = 30;

            //Direction of ant heading vertically and horizontaly (delta y and delta x) at first will default to 0
            //Later on code will generate reandom numbers between -DELTA_RANGE and DELTA_RANGE (i.e. between -5 and 5)
            //for example if dy is 2 and dx is -4 ant will move 2px down and 4px to the left every move
            this.resetDirection();

            this.everReseted = false;
            this.draw();
        }

        resetDirection() {
            this.newDy = getRandomDelta();
            this.newDx = getRandomDelta();
            if(!this.everReseted){
                this.dy = this.newDy;
                this.dx = this.newDx;
                this.everReseted = true;
            }

            //Once every 30 - 60 moves ant direction get reseted, every time the ant direction get reseted 
            //the code makes a desision of how many moves until next reset takes place...
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

        remove() {
            //Get the index of the ant
            const index = ants.indexOf(this);
            if (index > -1) {
                //Remove the ant from the ants array
                ants.splice(index, 1);
            }
        }

        draw() {
            if(this.numOfMovesToReset === 0){
                this.resetDirection();
            }

            //Instead of abruptly changing the new dy/dx change it gradually. i.e. every time the direction is being reseted
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
            if(this.nearCenter() && this.everReseted){
                this.remove();
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
                //console.log('hit top');
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
            if(!jsonAnts){
                return undefined;
            }           
            return JSON.parse(jsonAnts).map(oldAnt => {
                const newAnt = new Ant();
                Object.assign(newAnt, oldAnt);
                return newAnt;
            });
        }
    }


    const TO_RADIANS = Math.PI/180; 

    function drawRotatedImage(image, x, y, angle, sizeX, sizeY){ 
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


    /////////////////////////// Helper functions ///////////////////////////

    function getRandomNumber(min, max){
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function isNearCenter(positionY, positionX, nearPx) {
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

    function withinRange(num1, num2, range){
        //Check if 2 numbers are withing the range of each other
        return Math.max(num1, num2) - Math.min(num1, num2) <= range;
    }

    function getRandomDelta(){
        let number;
        do {
            number = getRandomNumber(DELTA_RANGE, -DELTA_RANGE +1);
        } while(number === 0);
        return number;
    }

    function getAngelFromXY(dx, dy){
        return Math.atan2(dx, -dy) * 180 / Math.PI;
    }


    /////////////////// and finnaly start the action //////////////////////

    const ants = Ant.fromStorage(localStorage.getItem('ants')) || [];

    //Set interval to Create a new ant
    setInterval(() => {
        ants.push(new Ant());
        const newAnt = {};
        Object.assign(newAnt, ants[0]);
        console.log(newAnt);
    }, 150);

    //Set interval to redraw all the ants
    setInterval(() => {
        //Resize the canvas and by doing that you basically erasing all the ants
        resizeCanvas();
        //All the calculations as for where to draw the hole of the ants (I played around with the numbers)
        ctx.drawImage(ANT_HOLE, window.innerWidth / 2 - 45, window.innerHeight / 2 - 85 / 2, 100, 100);
        //Go through all the ants and draw their current position
        ants.forEach(ant => ant.draw());


        localStorage.setItem('ants', Ant.toStorage(ants));
    }, 20);

    document.getElementById('reset').addEventListener('click', () => {
        ants.length = 0;
        localStorage.removeItem("ants");
    });

    console.log(Object.keys(ants[0].keys));

})();