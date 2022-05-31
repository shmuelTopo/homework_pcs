module.exports = (req, res, next) => {
  if (req.url === '/favicon.ico') {
    res.writeHead(204, 'Content-Type', 'image/x-icon');

    return res.end();
  }
  next();
};
