(function() {
    'use strict';

    const canvas = document.getElementById('theCanvas');

    function resizeCanvas(){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const contex = canvas.getContext('2d');

    class Ball {
        
        constructor (radius, color, dy, dx){
            this.radius = radius || getRandomNumber(15, 30);
            this.color = color || getRandomColor();
            this.y = radius || getRandomNumber(this.radius, window.innerWidth - this.radius);
            this.x = radius || getRandomNumber(this.radius, window.innerHeight - this.radius);;
            this.dy = dy || getRandomNumber(1, 8);
            this.dx = dx || getRandomNumber(1, 8);
            this.isMoving = true;
            this.draw();
        }

        draw(timeDelta){
            contex.fillStyle = this.color;
            contex.beginPath();
            contex.arc(this.y, this.x, this.radius, 0, Math.PI * 2);
            contex.fill();
            
            if(this.isMoving){
                let newDy;
                let newDx;

                if(!timeDelta){
                    timeDelta = 16.6;
                }
                
                newDy = this.dy * (timeDelta * 0.02);
                newDx = this.dx * (timeDelta * 0.02);

                console.log('After...');
                console.log('dy', this.dy, newDy);
                console.log('dx', this.dx, newDx);
                console.log('timeDelta', timeDelta);
                console.log('------------------');

                this.y = this.y + newDy;
                this.x = this.x + newDx;

                if(this.y > window.innerWidth - this.radius){
                    this.dy = -Math.abs(this.dy);
                }

                if(this.y < this.radius){
                    this.dy = Math.abs(this.dy);
                }
        
                if(this.x > window.innerHeight - this.radius){
                    this.dx = -Math.abs(this.dx);
                }

                if(this.x < this.radius){
                    this.dx = Math.abs(this.dx);
                }
            }
            
        }

        start() {
            this.isMoving = true;
        }

        stop() {
            this.isMoving = false;
        }

        
    }

    const balls = [];

    for(let i = 0; i < 50; i++){
        balls.push(new Ball());
    }

    let oldTimeStamp;
    function drawTheBalls(timeStamp){

        const timestampDiff = timeStamp - oldTimeStamp;
        oldTimeStamp = timeStamp;
        //resizeCanvas();

        balls.forEach(ball => {
            ball.draw(timestampDiff);
        });
        requestAnimationFrame(drawTheBalls);
    }

    requestAnimationFrame(drawTheBalls);


    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function getRandomNumber(min, max){
        return Math.floor(Math.random() * (max - min)) + min;
    }

    const pause = document.getElementById('pause');
    pause.addEventListener('click', () => {
        if(pause.innerText === 'Pause'){
            console.log('Pause');
            pause.innerText = 'Start';
            balls.forEach(ball => ball.stop());
        } else {
            console.log('Start');
            pause.innerText = 'Pause';
            balls.forEach(ball => ball.start());

        }
    }); 
    
})();