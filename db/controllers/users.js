var Users = require('../models/users');

const newUser = (params) => {
  return new Users({
    first_name: params.firstname,
    last_name: params.lastname,
    password: params.password,
    phone_number: params.phone_number,
    email: params.email
  })
  .save()
};

const getUserByEmail = (params) => {
  return new Users({
    email: params
  })
  .fetch()
};

const getUserById = (params) => {
  return new Users({ id: params.id }).fetch();
}

module.exports = newUser;
module.exports = getUserByEmail;
module.exports = getUserById;
