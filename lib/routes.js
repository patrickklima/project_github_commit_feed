var fs = require('fs');
const gh = require('./wrapper');

var routes = {
  get: {},
  post: {}
};

routes.htmlStr =  fs.readFileSync('public/index.html', 'utf8');

routes['get']['/'] = () => {
  return routes.replaceCommitData();
};

routes['get']['/commits'] = (params) => {
  var result = gh.getCommits(params);   //unresolved promise
  var replaced = result.then(() => {  
    return routes.replaceCommitData();
  });
  return replaced;
};

routes.replaceCommitData = () => {
  var fullHTMLString = new Promise((res, rej) => {
    try {
      var commits = require('../data/commits');
      console.log("replacing. Commits are: ");
      console.log(JSON.stringify(commits,null,2));
      routes.htmlStr = routes.htmlStr.replace(
        "{{ commitFeed }}",
        JSON.stringify(commits,null,2));
    } catch(err) {
      console.log(err);
      rej(routes.htmlStr);
    }
    res(routes.htmlStr);
  });
  // console.log(fullHTMLString)
  return fullHTMLString;
};
    
  
module.exports = routes;



