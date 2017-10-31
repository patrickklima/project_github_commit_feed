const http = require('http');
const routes = require('./lib/routes');
const url = require('url');
const commits = require('./data/commits');

const hostname = process.env.IP;
const port = process.env.PORT;

var htmlStr = "";


const server = http.createServer((req, res) => {
  var method = req.method.toLocaleLowerCase();
  var path = url.parse(req.url).pathname;
  
  console.log(path);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  
  if (path.includes('.')) {
    htmlStr = routes['get']['/']();
  } else {
    htmlStr = routes[method][path]();
  }
  htmlStr = htmlStr.replace(
    "{{ commitFeed }}",
    JSON.stringify(commits,null,2)
    );
  console.log(htmlStr);
  res.end(htmlStr);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});