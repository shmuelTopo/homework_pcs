'use strict';

function myEvery(theArr, callback){
    // coudnt't use for each, since if one of the itmes in the array didn't
    // pass the callback there it no way to break out of the for each
    for(let i = 0; i < theArr.length; i++) {
        if(!callback(theArr[i])){
            return false;
        }
    }
    return true;
}


let letters1 = ['a', 'b', 'c', 'd'];
let letters2 = ['A', 'B', 'C', 'D'];
let letters3 = ['a', 'B', 'c', 'D'];

function isUpper(l) {
    return l === l.toUpperCase();
}

console.log('-----------Array Every-----------');

console.log(`Checking ${letters1}`);
console.log('myEvery ->', myEvery(letters1, isUpper));
console.log('Array.every ->', letters1.every(isUpper));
console.log('--------------------------------');

console.log(`Checking ${letters2}`);
console.log('myEvery ->', myEvery(letters2, isUpper));
console.log('Array.every ->', letters2.every(isUpper));
console.log('--------------------------------');

console.log(`Checking ${letters3}`);
console.log('myEvery ->', myEvery(letters3, isUpper));
console.log('Array.every ->', letters3.every(isUpper));

function mySome(theArr, callback) {
    // coudnt't use for each, since if one of the itmes in the array didn't
    // pass the callback there it no way to break out of the for each
    for (let i = 0; i < theArr.length; i++) {
        if (callback(theArr[i])) {
            return true;
        }
    }
    return false;
}

console.log('-----------Array Some-----------');
console.log(`Checking ${letters1}`);
console.log('mySome ->', mySome(letters1, isUpper));
console.log('Array.some ->', letters1.some(isUpper));
console.log('--------------------------------');

console.log(`Checking ${letters2}`);
console.log('mySome ->', mySome(letters2, isUpper));
console.log('Array.some ->', letters2.some(isUpper));
console.log('--------------------------------');

console.log(`Checking ${letters3}`);
console.log('mySome ->', mySome(letters3, isUpper));
console.log('Array.some ->', letters3.some(isUpper));

function onlyIf(theArray, callback, action) {
    // Pass and array and the function will only do the action if true is returned by the callback
    for(let i = 0; i < theArray.length; i++){
        if(callback(theArray[i])) {
            action(theArray[i]);
        }
    }
}

function onlyIf2(theArray, callback, action) {
    // Pass and array and the function will only do the action if true is returned by the callback
    theArray.filter(callback).forEach(e => {
        action(e);
    });
}

console.log(`--------onlyIf(${letters3})--------`);
onlyIf(letters3, isUpper, e => console.log(`${e} is upperCase`));

console.log(`--------onlyIf2(${letters3})--------`);
onlyIf2(letters3, isUpper, e => console.log(`${e} is upperCase`));

