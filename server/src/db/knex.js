var environment = process.env.NODE_ENV || 'test';
var config = require('../../knexfile.js')(environment);

module.exports = require('knex')(config);
