import express from 'express';
import serveStatic from 'serve-static';
import * as path from 'path';

const app = express();

// here we are configuring dist to serve app files
app.use('/', serveStatic(path.join(__dirname, '/lib')));

// this * route is to serve project on different page routes except root `/`
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '/lib/app.js'));
});

const port = process.env.PORT || 8080;
app.listen(port);
console.log(`app is listening on port: ${port}`);
