(function() {
    'use strict';

    function doSomethingOne(n, callback, failCallback){
        setTimeout(() => callback(n + 1), 1000);
    }

    function doSomethingTwo(n, callback, failCallback){
        setTimeout(() => callback(n + 2), 1000);
    }

    function doSomethingThree(n, callback, failCallback){
        setTimeout(() => /*callback*/failCallback(n + 3), 1000);
    }

    function onFailure(e){
        console.error('OOPS', e);
    }

    doSomethingOne(2, r => {
        doSomethingTwo(r, r2 => {
            doSomethingThree(r2, r3 => {
                console.log(r3);
            }, onFailure);
        }, onFailure);
    }, onFailure);

    /*
    doSomethingOne(2)
        .then(r => doSomethingTwo(r))
        .then(r => doSomethingThree(r))
        .then(r => console.log(r))
        .catch(e => console.log(e));
    */

    ////////
    function thirdPartyFunction(callback) {
        //callback('hello');

        setTimeout(() => callback('Hello'), 2000);
    }
    ////////

    console.log('Before calling 3rd party function');
    thirdPartyFunction(results => console.log('back from third party library with results', results)); 
    console.log('After calling 3rd party function');

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            const succeded = 1 + 1 === 3; // do some work
            if(succeded){
                resolve('succeded');
            } else {
                reject('falied');
            }
        }, 2000); 
    });


    console.log('Before calling Promise');
    promise
        .then(r => console.log('then got', r))
        .catch(e => console.error('catch got', e));
    console.log('After calling Promise');



})();