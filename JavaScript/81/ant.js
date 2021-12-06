(function() {
    'use strict';

    
    const canvas = document.getElementById('theCanvas');
    const ctx = canvas.getContext('2d');
    const ANT_IMAGE = document.getElementById('antImage');
    const ANT_HOLE = document.getElementById('antHole');
    const DELTA_RANGE = 5;
    const ants = [];


    function resizeCanvas(){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Ant {
        
        constructor() {
            this.x = window.innerWidth / 2;
            this.y = window.innerHeight / 2;
            this.size = 20;
            this.dy = 0;
            this.dx = 0;
            this.resetDirection();
            this.everReseted = false;
            this.draw();
        }

        resetDirection() {
            this.newDy = getRandomDelta();
            this.newDx = getRandomDelta();
            if(this.dy === 0){
                this.dy = this.newDy;
                this.dx = this.newDx;
            }
            this.numOfMovesLeft = getRandomNumber(30, 60);  
            this.everReseted = true;
        }

        setNewDirection(dy, dx) {
            this.dy = dy;
            this.dx = dx;
        }

        nearCenter() {
            //check if near center vertically
            const nearCenterPixels = 25;
            if(window.innerHeight / 2 - this.y < nearCenterPixels && window.innerHeight / 2 - this.y > -nearCenterPixels){
                if(window.innerWidth / 2 - this.x < nearCenterPixels && window.innerWidth / 2 - this.x > -nearCenterPixels){
                    if(this.everReseted){
                        const index = ants.indexOf(this);
                        if (index > -1) {
                            ants.splice(index, 1);
                        }
                    }
                }
            }
        }

        draw() {
            if(this.numOfMovesLeft === 0){
                this.resetDirection();
            }

            const diff = 0.2;
            if(this.newDy > this.dy){
                this.dy += diff;
            } else if(this.newDy < this.dy){
                this.dy -= diff;
            }

            if(this.newDx > this.dx){
                this.dx += diff;
            } else if(this.newDx < this.dx){
                this.dx -= diff;
            }



            if(this.everReseted && this.nearCenter()){
                this.y = -this.y;
            }
            const angel = getAngelFromXY(this.dx, this.dy);
            this.x = this.x + this.dx;
            this.y = this.y + this.dy;

            if(this.x > (window.innerWidth + this.size)){
                this.dx = -Math.abs(this.dx);
                //console.log('hit right');
            }

            if(this.x < (0 - this.size)){
                this.dx = Math.abs(this.dx);
                //console.log('hit left');
            }
    
            if(this.y > (window.innerHeight + this.size)){
                this.dy = -Math.abs(this.dy);
                //console.log('hit bottom');
            }

            if(this.y < (0 -this.size)){
                this.dy = Math.abs(this.dy);
                //console.log('hit top');
            }
            drawRotatedImage(
                ANT_IMAGE, this.x, this.y, 
                angel/*, 
                this.sizeX, this.sizeY*/
            ); 
            this.numOfMovesLeft -= 1;         
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

    function getRandomNumber(min, max){
        return Math.floor(Math.random() * (max - min)) + min;
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

    setTimeout(() => {
        setInterval(() => {
            ants.push(new Ant());
        }, 100);
    }, 10000);
    
    


    setInterval(() => {
        resizeCanvas();
        ctx.drawImage(ANT_HOLE, window.innerWidth / 2 - 45, window.innerHeight / 2 - 85 / 2, 100, 100);

        ants.forEach(ant => {
            const drawTheAnt = ant.draw.bind(ant);
            drawTheAnt();
            
        });
    }, 20);

})();