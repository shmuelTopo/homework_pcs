'use strict';

const http = require('http');
//
const bl = require('bl');

const url = process.argv[2];

let data = '';
http.get(url, (response) => {
  response.setEncoding('utf8');
  response.on('data', (chunk) => {
    data += chunk;
  });
  response.on('end', () => {
    console.log(data.length);
    console.log(data);
  });
});

// http.get(url, response => {
//     response.pipe(bl((err, data) => {
//         if (err) {
//             return console.error(err);
//         }
//         data = data.toString();
//         console.log(data.length);
//         console.log(data);
//     }));
// });


