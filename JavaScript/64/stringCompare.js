window.myApp = window.myApp || {};

window.myApp.utils = (function (myModule) {
    'use strict';

    myModule.stringEqualsNoCase = (a, b) => a.toLowerCase() === b.toLowerCase();

    return myModule;

})(window.myApp.utils || {});