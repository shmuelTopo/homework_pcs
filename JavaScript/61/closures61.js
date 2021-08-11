'use strict';

function multiply (num1, num2) {
    return num1 * num2;
}

console.log(`3 * 4 = ${multiply(3, 4)}`);

function getMultiplier() {
    return (num1, num2) => num1 * num2;
}

let multiply2 = getMultiplier();
console.log(`5 * 4 = ${multiply2(5, 4)}`);

function getMultiplierByNumber(multiplier) {
    return (num) => multiplier * num;
}

let weeksToDaysCalculator = getMultiplierByNumber(7);
let weeks = 8;
console.log(`There are ${weeksToDaysCalculator(weeks)} days in ${weeks} weeks`);

