window.diceApp = window.diceApp || {};

window.diceApp.utils = (function(myModule){
    'use strict';

    myModule.getRandomColorString = () => {
        let r = Math.ceil(Math.random() * 255);
        let g = Math.ceil(Math.random() * 255);
        let b = Math.ceil(Math.random() * 255);
        
        return `rgb(${r},${g},${b})`;
    };

    myModule.getRandomColorArray = () => {
        let r = Math.ceil(Math.random() * 255);
        let g = Math.ceil(Math.random() * 255);
        let b = Math.ceil(Math.random() * 255);
        
        return [r,g,b];
    };

    return myModule;

})(window.diceApp.utils || {});