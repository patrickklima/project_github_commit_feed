const http = require('http');
const routes = require('./lib/routes');
const url = require('url');
const querystring = require('querystring');
const fs = require('fs');


const hostname = process.env.IP;
const port = process.env.PORT;

var commits = require('./data/default');
fs.writeFileSync('./data/commits.json', JSON.stringify(commits,null,2));

const server = http.createServer((req, res) => {
  
  if (req.url === '/favicon.ico') {
    res.writeHead(200, {'Content-Type': 'image/x-icon'} );
    res.end();
    console.log('favicon requested');
    return;
  }
  
  var method = req.method.toLocaleLowerCase();
  var reqURL = url.parse(req.url);
  var path = reqURL.pathname;
  console.log(`Path is ${path}`);  

  if (reqURL.search) {
    var params = reqURL.search.substring(1);
    params = querystring.parse(params);
    console.log(`Params are `);
    console.log(params);
  }
  
  res.writeHead(200, {'Content-Type': 'text/html'} );
  routes[method][path](params).then(fullHTMLString => {
    console.log(fullHTMLString);
    res.end(fullHTMLString);
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});