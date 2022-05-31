module.exports = ((res, req, next) => {
    req.writeHead(200, { 'content-type': 'text/html' });
    next();
});