const fs = require('fs');
const theFile = process.argv[2];

function printNumOfLines(error, file) {
  if (error) {
    return console.error(error);
  }
  const numOfLines = file.toString().split('\n').length -1;

  console.log(numOfLines);
}

fs.readFile(theFile, printNumOfLines);
