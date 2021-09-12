window.app = window.app || {};

window.app.counter = (function (myModule) {
    'use strict';

    let counterNumber = 0;

    myModule.increment = () => {
        counterNumber++;
    };
    myModule.getCount = () => counterNumber;

    return myModule;

})(window.app.counter || {});