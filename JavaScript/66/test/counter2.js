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