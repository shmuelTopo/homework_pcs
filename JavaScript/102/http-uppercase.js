const http = require('http');

http.createServer((req, res) => {
    res.writeHead(200, { 'content-type': 'text/plain' });
    
    req.on('data', chunck => {
        res.write(chunck.toString().toUpperCase());
    })

    req.on('end', () => {
        res.end();
    });
    
}).listen(process.argv[2]);