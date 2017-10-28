const http = require('http');
var routes = require('./lib/routes');
var url = require('url');

const hostname = process.env.IP;
const port = process.env.PORT;

const server = http.createServer((req, res) => {
  var method = req.method.toLocaleLowerCase();
  var path = url.parse(req.url).pathname;
  
  console.log(path);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  if (path.includes('.')) {
    res.end(routes['get']['/']());
  } else {
    res.end(routes[method][path]());
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});