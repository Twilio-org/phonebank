import User from '../models/users';

export default {
  saveNewUser: params =>
    new User({
      first_name: params.first_name,
      last_name: params.last_name,
      password_hash: params.password,
      phone_number: params.phone_number,
      email: params.email
    })
      .save(),

  getUserByEmail: params =>
    new User({
      email: params.email
    })
      .fetch(),

  getUserById: params =>
    new User({ id: params.id }).fetch(),

  updateUserById: params =>
    new User()
      .where({ id: params.id })
      .save({
        first_name: params.first_name,
        last_name: params.last_name,
        password_hash: params.password,
        phone_number: params.phone_number,
        email: params.email
      }, {
        method: 'update'
      }),

  deactivateUserById: params =>
    new User()
      .where({ id: params.id })
      .save({
        is_active: false
      }, {
        method: 'update'
      })
};
