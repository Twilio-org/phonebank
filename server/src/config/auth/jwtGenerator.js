var jwt = require('jsonwebtoken');
var jwtOptions = require('./passportConfig').jwtOptions

function genToken(userId) {
  var payload = {id: userId};
  var token = jwt.sign(payload, jwtOptions.secretOrKey);

  return token;
}

module.exports = genToken
