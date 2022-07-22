
(function () {
  'use strict';

  const canvas = document.getElementById('theCanvas');
  const context = canvas.getContext('2d');

  const THING_SIZE = 64;

  function resizeCanvas() {
    canvas.width = (window.innerWidth - 2) - ((window.innerWidth - 2) % THING_SIZE);
    canvas.height = (window.innerHeight - 2) - ((window.innerHeight - 2) % THING_SIZE);
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  const crashSound = document.getElementById('crash');
  const crunchSound = document.getElementById('crunch');

  let gameOver = false;
  let score = 0;
  let speed = 500;

  class Snake {
    constructor() {
      this.direction = 'ArrowRight';
      this.location = [{x: 0, y: 0}];

      document.addEventListener('keydown', event => {
        switch (event.key) {
          case 'ArrowUp':
          case 'ArrowDown':
          case 'ArrowLeft':
          case 'ArrowRight':
            this.direction = event.key;
        }
      });

      this.draw();
    }

    draw() {
      const theHead = this.location[0];
      context.drawImage(snakeHead, theHead.x, theHead.y, THING_SIZE, THING_SIZE);
      this.location.forEach((segment, i) => {
        if( i ===  0) {
          return;
        }
        context.drawImage(snakesegment, segment.x, segment.y, THING_SIZE, THING_SIZE);
      });
    }

    move(eat = false) {
      const theHead = this.location[0];
      let x = theHead.x;
      let y = theHead.y;

      let newHeadPosition = {
        x: theHead.x,
        y: theHead.y
      }

      switch (this.direction) {
        case 'ArrowRight':
          newHeadPosition.x += THING_SIZE;
          break;
        case 'ArrowLeft':
          newHeadPosition.x -= THING_SIZE;
          break;
        case 'ArrowUp':
          newHeadPosition.y -= THING_SIZE;
          break;
        case 'ArrowDown':
          newHeadPosition.y += THING_SIZE;
          break;
      }

      this.location.unshift(newHeadPosition);
      
      if (theHead.x === apple.x && theHead.y === apple.y) {
        score++;
        speed = speed * 0.9;
        crunchSound.currentTime = 0;
        crunchSound.play();
        apple.move(this.location);
      } else {
        this.location.pop();
      }

      if (x < 0 || x > canvas.width - THING_SIZE || y < 0 || y > canvas.height - THING_SIZE) {
        gameOver = true;
      }

      this.location.forEach((seg, i) => {
        if (i === 0) return;

        if (newHeadPosition.x === seg.x && newHeadPosition.y === seg.y) {
          gameOver = true;
        }
      });

      this.draw();
    }
  }

  class Apple{
    constructor() {
     this.move();
    }

    draw() {
      context.drawImage(appleImg, this.x, this.y, THING_SIZE, THING_SIZE);
    }

    move(snakeLocation) {
      let loop = true;
      let newAppleLocation;
      while(loop) {
        loop = false;
        newAppleLocation = {
          x: this.getRandomNumber(0, canvas.width - 1),
          y: this.getRandomNumber(0, canvas.height - 1)
        }
        if (!snakeLocation) {
          break;
        }

        for(let loc of snakeLocation) {
          if(JSON.stringify(loc) === JSON.stringify(newAppleLocation)) {
            loop = true;
            break;
          }
        }

      }
      
      if(!loop) {
        this.x = newAppleLocation.x;
        this.y = newAppleLocation.y;
        this.draw();
      }
      
    }

    getRandomNumber(min, max) {
      let r = Math.floor(Math.random() * (max - min + 1)) + min;
      r = r - r % THING_SIZE;
      return r;
    }
  }

  let snake;
  let apple;

  function gameLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.font = 'bold 30px Arial';
    context.fillText(`Score: ${score}`, canvas.width - 160, 40);

    snake.move();
    apple.draw();

    if (!gameOver) {
      setTimeout(gameLoop, speed);
    } else {
      context.font = 'bold 30px Arial';
      context.fillText('Game Over', canvas.width / 2 - 80, canvas.height / 2);
      crashSound.currentTime = 0; // in case it was playing
      crashSound.play();
    }
  }

  const snakeHead = new Image();
  snakeHead.src = 'images/snakehead.png';
  let headloaded = false;

  const snakesegment = new Image();
  snakesegment.src = 'images/snakesegment.png';
  let segmentloaded = false;

  snakeHead.onload = () => {
    headloaded = true;
    if(segmentloaded) {
      startGame();
    }
  };

  snakesegment.onload = () => {
    segmentloaded = true;
    startGame();
  };

  const startGame = () => {
    snake = new Snake();
    setTimeout(gameLoop, speed);
  }

  const appleImg = new Image();
  appleImg.src = 'images/redapple.png';
  appleImg.onload = () => {
    apple = new Apple();
  };
}());
