(function() {
    'use strict';

    class Vehicle {
        describeMoving = 'GOING';

        constructor(name, color){
            this.color = color;
            this.name = name;
            this.speed = 0;
        } 

        start(speed) {
            this.speed = speed;
            console.log(`Now ${this.describeMoving} at speed ${speed}`);
        }

        print() {
            console.log(`I am a ${this.color} ${this.name}, ${this.describeMoving} at speed ${this.speed}`);
        }
    }

    class Plane extends Vehicle {
        describeMoving = 'FLYING';
        constructor (name, color) {
            super(name, color);
        }
    }

    console.log('-------------- VEHICLE ---------------');

    const volvo = new Vehicle('Volvo', 'red');
    volvo.print();
    volvo.start(100);
    volvo.print();

    console.log('--------------- PLANE ----------------');

    const boeing = new Plane('Boeing', 'blue');
    boeing.print();
    boeing.start(200);
    boeing.print();

})();