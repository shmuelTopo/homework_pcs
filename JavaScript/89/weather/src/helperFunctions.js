const usZips = require('us-zips/array')

export function getRandomZipCode() {
    const index = Math.floor(Math.random() * usZips.length) -1;
    return usZips[index].zipCode;
}