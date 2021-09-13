window.app = window.app || {};

window.app.counterGenerator = (function (myModule) {
    'use strict';

    let countOfCounters = 0;

    myModule.getCounter = () => {
        let counterNumber = 0;
        countOfCounters++;

        return {
            increment: () => {
                counterNumber++;
            },
            getCount: () => counterNumber
        };

    };

    myModule.getCountOfCounters = () => countOfCounters;

    return myModule;

})(window.app.counterGenerator || {});

// SL - nice
// SL - grade - 97 (clearly you have the understanding to have gotton 100 - but you dodnt follow directins carefully enough...)