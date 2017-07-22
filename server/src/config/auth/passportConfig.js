var passport = require("passport");
var passportJWT = require("passport-jwt");
var users = require('../../db/controllers/users');

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = 'JjS6E32hy1yBbhFN7uYI8t8IqpPy7xgw';

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);
  // usually this would be a database call:
  var user = users.getUserById({ id: jwt_payload.id })
  .then(function(user){
    if (user) {
      next(null, user);
    } else {
      next(null, false);
    }
  });
});

passport.use(strategy);

module.exports = {
  passport,
  jwtOptions
}
