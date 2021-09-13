(function() {
    'use strict';
    // SL - your changing the exisiting array, question specifically asked for a NEW array leaving original unchanged...
    function myMap(theArray, callback){
        for(let i = 0; i < theArray.length; i++){
            theArray[i] = callback(theArray[i]);
        }
    }

    let numbers = [2, 3, 4, 7];

    // SL - given how you did it - when I click these open in debugger - these both look the same... The debugger shows the contents of the array when the open is clicked open - and youve already modified it by then
    console.log('Before mapping:', numbers);
    myMap(numbers, (number) => number * 2);
    console.log('After mapping:', numbers);

})();