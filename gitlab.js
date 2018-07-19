var config = require(process.cwd() + '/config');
var gitlab = new (require('gitlab'))(config);
module.exports = gitlab;
