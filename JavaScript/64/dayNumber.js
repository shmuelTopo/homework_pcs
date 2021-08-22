window.myApp = window.myApp || {};

window.myApp.utils = (function(myModule){
    'use strict';

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wendesday', 'Thursday', 'Friday', 'Shaboos'];

    myModule.getDayName = (num) => {
        if (num < 1 || num > 7) {
            return undefined;
        }
        return days[num - 1];
    };

    myModule.getDayNumber = dayName => days.findIndex(e => window.myApp.utils.stringEqualsNoCase(e, dayName)) + 1;
    return myModule;

})(window.myApp.utils || {});