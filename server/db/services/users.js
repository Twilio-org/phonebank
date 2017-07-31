export default {
  saveNewUser: (params, Model) => {
    const extractedParams = {
      first_name: params.firstName,
      last_name: params.lastName,
      password_hash: params.password,
      phone_number: params.phoneNumber,
      email: params.email
    };

    return new Model(extractedParams).save();
  },

  getUserByEmail: (params, Model) => {
    const { email } = params;

    return new Model({ email })
      .fetch();
  },

  getUserById: (params, Model) => {
    const { id } = params;

    return new Model({ id })
      .fetch();
  },

  updateUserById: (params, Model) => {
    const { id } = params;
    const extractedParams = {
      first_name: params.firstName,
      last_name: params.lastName,
      password_hash: params.password,
      phone_number: params.phoneNumber,
      email: params.email
    };

    return new Model()
      .where({ id })
      .save(extractedParams, {
        method: 'update'
      });
  },

  deactivateUserById: (params, Model) => {
    const { id } = params;

    return new Model()
      .where({ id })
      .save({
        is_active: false
      }, {
        method: 'update'
      });
  }
};
