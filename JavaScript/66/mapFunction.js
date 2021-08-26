(function() {
    'use strict';
    function myMap(theArray, callback){
        for(let i = 0; i < theArray.length; i++){
            theArray[i] = callback(theArray[i]);
        }
    }

    let numbers = [2, 3, 4, 7];

    console.log('Before mapping:', numbers);
    myMap(numbers, (number) => number * 2);
    console.log('After mapping:', numbers);

})();