var Users = require('../models/users');

module.exports = {
  newUser: (params) => {
    return new Users({
      first_name: params.first_name,
      last_name: params.last_name,
      password_hash: params.password,
      phone_number: params.phone_number,
      email: params.email
    })
    .save()
  },

  getUserByEmail: (params) => {
    return new Users({
      email: params
    })
    .fetch()
  },

  getUserById: (params) => {
    return new Users({ id: params.id }).fetch();
  }

}
