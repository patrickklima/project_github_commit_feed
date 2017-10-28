var fs = require('fs');

var str = fs.readFileSync('./public/index.html', 'utf8');
console.log(str);