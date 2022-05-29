const fs = require('fs');
const http = require('http');
const path = require('path');

const contentTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.txt': 'text/plain',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.mp4': 'video/mp4'
};

//create a simple node server
http
  .createServer(async (req, res) => {
    if (req.url === '/favicon.ico') {
      return res.end();
    }

    if (req.url === '/') {
      res.writeHead(301, { Location: '/index.html' });
    } else {
      res.setHeader('Content-Type', contentTypes[path.extname(req.url) || '.html']);

      try {
        const fileStream = fs.createReadStream(`./public${req.url}`);
        let chunks = 0;
        fileStream.on('data', (chunk) => {
          chunks++;
          res.write(chunk);
        });

        fileStream.on('end', () => {
          console.log(req.url, 'has', chunks, 'chunks');
          res.end();
        });
      } catch (err) {
        switch (err.code) {
          case 'ENOENT':
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.write('<h1>404 File Not Found</h1>');
            break;
          default:
            res.statusCode = 500;
            res.write(`Internal Server Error. Unable to get ${req.url}`);
        }
      }
    }
  })
  .listen(80);
