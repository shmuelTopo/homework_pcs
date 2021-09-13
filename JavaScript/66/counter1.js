window.app = window.app || {};

window.app.counter = (function (myModule) {
    'use strict';

    let counterNumber = 0;

    myModule.increment = () => {
        counterNumber++; // SL - nice candidate for 1 liner here...
    };
    myModule.getCount = () => counterNumber;

    return myModule;

})(window.app.counter || {});

// SL - nice