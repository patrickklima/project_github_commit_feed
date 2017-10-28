var fs = require('fs');
var routes = {
  get: {},
  post: {}
};

routes.htmlStr =  fs.readFileSync('public/index.html', 'utf8');
routes['get']['/']        = () => (routes.htmlStr);
routes['get']['/commits'] = () => (routes.htmlStr);


// routes.handler = (method, path) => {
  
//   if (path === '/') {
//     return htmlStr;  
//   } else if (path === '/commits') {
//     return htmlStr;
//   } else {
//     return htmlStr;
//   }

// };


module.exports = routes;