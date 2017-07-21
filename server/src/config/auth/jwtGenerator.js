var jwt = require('jsonwebtoken');
var jwtOptions = require('passport').jwtOptions

function genToken(userId) {
  var payload = {id: userId};
  var token = jwt.sign(payload, jwtOptions.secretOrKey);
}

module.exports = genToken
