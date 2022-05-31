const app = require('connect')();

app.use(require('./dismissFavicon'));
app.use(require('./htmlContent'));

app.use((req, res, next) => {
  res.write('<h2>My app will always run this</h2>');
  next();
});

app.use(require('./getParams'));

app.use('/home', (req, res, next) => {
    const name = req.searchParams.get('name') || 'Stranger';
    res.end(`<p>Hello ${name}</p>`);
    next();
});

//From this point on, all middleware will only be available to authorized users
app.use(require('./authorization.js'));

app.use('/about', (req, res, next) => {
  res.end(`<p>Trump Will Run in 2024</p>`);
  next();
});

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  res.statusCode = error.status || 500;
  res.end(`<h1>${error.message}</h1>`);
});

app.listen(process.argv[2]);