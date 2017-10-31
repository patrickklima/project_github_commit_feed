var fs = require('fs');
var routes = {
  get: {},
  post: {}
};

routes.htmlStr =  fs.readFileSync('public/index.html', 'utf8');
routes['get']['/']        = () => (routes.htmlStr);
routes['get']['/commits'] = () => (routes.htmlStr);



module.exports = routes;