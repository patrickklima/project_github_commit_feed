const Github = require('github');
const fs = require('fs');

var github = new Github();

github.authenticate({
  type: 'token',
  token: process.env.GITHUB_AUTH
});

var query = {
  owner: "defunkt",
  repo: "assignment_node_dictionary_reader"
};

github.repos.getCommits(query, function (err, res) {
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
  fs.writeFileSync('../data/message.txt', JSON.stringify(commitObj,null,2));
});

// Wrapper gets the following data from the API:
// * The commit message
// * The author (the whole author object is fine)
// * The HTML URL
// * The SHA hash identifier




