const fs = require('fs');
const file = process.argv[2];

const fileBuf = fs.readFileSync(file);

let newLines = 0;

for(let c of fileBuf.toString()) {
    if(c === '\n') {
        newLines++;
    }
}

console.log(newLines);