const Github = require('github');
const fs = require('fs');

var gh = {};
gh.github = new Github();

gh.github.authenticate({
  type: 'token',
  token: process.env.GITHUB_AUTH
});

// var query = {
//   owner: "thomahau",
//   repo: "assignment_node_dictionary_reader"
// };

gh.getCommits = query => {
  var ghCall = new Promise((res, rej) => {
    try{
      gh.github.repos.getCommits(query, (err, res) => {
        // console.log("in the wrapper, query is: ");
        // console.log(query);
        if (err) throw err;
        var commitFeed = res.data.map(commit => {
          var item = {};
          item.message = commit["commit"]["message"];
          item.author = commit["commit"]["author"];
          item.url = commit["commit"]["tree"]["url"];
          item.sha = commit["commit"]["tree"]["sha"];
          return item;
        });
        var commitObj = {};
        commitObj[`${query.owner}`] = {};
        commitObj[`${query.owner}`][`${query.repo}`] = commitFeed;
        console.log(JSON.stringify(commitObj,null,2));
        fs.writeFileSync('./data/commits.json', JSON.stringify(commitObj,null,2));
      });
    } catch(err) {
      console.log(err);
      rej(false);
      return;
    }
    res(true);
  });
  return ghCall;
};

module.exports = gh;

// Wrapper gets the following data from the API:
// * The commit message
// * The author (the whole author object is fine)
// * The HTML URL
// * The SHA hash identifier




