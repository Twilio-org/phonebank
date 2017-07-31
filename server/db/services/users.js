export default {
  saveNewUser: (params, Model) => {
    const extractedParams = {
      first_name: params.first_name,
      last_name: params.last_name,
      password_hash: params.password,
      phone_number: params.phone_number,
      email: params.email
    };

    return new Model(extractedParams).save();
  },

  getUserByEmail: (params, Model) => {
    const userEmail = params.email;

    return new Model({ email: userEmail })
      .fetch();
  },

  getUserById: (params, Model) => {
    const userId = params.id;

    return new Model({ id: userId })
      .fetch();
  },

  updateUserById: (params, Model) => {
    const userId = params.id;
    const extractedParams = {
      first_name: params.first_name,
      last_name: params.last_name,
      password_hash: params.password,
      phone_number: params.phone_number,
      email: params.email
    };

    return new Model()
      .where({ id: userId })
      .save(extractedParams, {
        method: 'update'
      });
  },

  deactivateUserById: (params, Model) => {
    const userId = params.id;

    return new Model()
      .where({ id: userId })
      .save({
        is_active: false
      }, {
        method: 'update'
      });
  }
};
