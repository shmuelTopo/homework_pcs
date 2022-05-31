const net = require('net');
const port = process.argv[2];

net.createServer((socket) => {
    const date = new Date();
    socket.write(getFormatedDate(date));
    socket.end("\n");
}).listen(port);


function getFormatedDate(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    
    return `${year}-${pad(month, 2)}-${pad(day, 2)} ${hours}:${minutes}`;
}

function pad(num, size) {
  num = num.toString();
  while (num.length < size) num = '0' + num;
  return num;
}

