const http = require('http');

http.createServer((req, res) => {
    if (req.url === '/favicon.ico') {
      return res.end();
    }

    const baseUrl = 'http://' + req.headers.host;
    const url = new URL(req.url, baseUrl);
    console.log(url.pathname, url.searchParams.get('iso'));


    if(url.pathname === '/api/parsetime') {
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(getJsonTime(url.searchParams.get('iso')));
    } else if (url.pathname === '/api/unixtime') {
      res.writeHead(200, { 'content-type': 'application/json' });
      res.end(getJsonUnixtime(url.searchParams.get('iso')));
    }
    
    res.end();
}).listen(process.argv[2]);

function getJsonTime(iso) {
    const date = new Date(iso);
    console.log(date.toDateString());
    return JSON.stringify({
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds()
    });
}

function getJsonUnixtime(iso) {
    const date = new Date(iso);
    return JSON.stringify({
        unixtime: date.getTime()
    });
}
