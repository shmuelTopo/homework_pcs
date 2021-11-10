(function() {
    'use strict';

    function Vehicle(name, color) {
        this.color = color;
        this.name = name;
        this.speed = 0;
    }

    Vehicle.prototype.start = function(speed) {
        this.speed = speed;
        console.log(`Now going at speed ${speed}`);
    };

    Vehicle.prototype.print = function() {
        console.log(`I am a ${this.color} ${this.name}, going at speed ${this.speed}`);
    };

    function Plane(name, color) {
        Vehicle.call(this, name, color);
    }

    Plane.prototype = Object.create(Vehicle.prototype);
    Plane.prototype.constructor = Plane;

    const volvo = new Vehicle('Volvo', 'red');
    volvo.print();
    volvo.start(100);
    volvo.print();

    const boeing = new Plane('Boeing', 'blue');
    boeing.print();
    boeing.start(200);
    boeing.print();

})();