export default {
  saveNewUser: (params, Model) =>
    new Model({
      first_name: params.first_name,
      last_name: params.last_name,
      password_hash: params.password,
      phone_number: params.phone_number,
      email: params.email
    })
      .save(),

  getUserByEmail: (params, Model) =>
    new Model({
      email: params.email,
    })
      .fetch(),

  getUserById: (params, Model) =>
    new Model({
      id: params.id
    })
    .fetch(),

  updateUserById: (params, Model) =>
    new Model()
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

  deactivateUserById: (params, Model) =>
    new Model()
      .where({ id: params.id })
      .save({
        is_active: false
      }, {
        method: 'update'
      })
};
