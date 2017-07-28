export default {
  saveNewUser: (params, Model) => {
    const extractedParams = {
      firstName: params.firstName,
      lastName: params.lastName,
      passwordHash: params.password,
      phoneNumber: params.phoneNumber,
      email: params.email
    };

    return new Model(extractedParams).save();
  },

  getUserByEmail: (params, Model) => {
    const email = params.email;

    return new Model({ email })
      .fetch();
  },

  getUserById: (params, Model) => {
    const userId = params.id;

    return new Model({ userId })
      .fetch();
  },

  updateUserById: (params, Model) => {
    const id = params.id;
    const extractedParams = {
      firstName: params.firstName,
      lastName: params.lastName,
      passwordHash: params.password,
      phoneNumber: params.phoneNumber,
      email: params.email
    };

    return new Model()
      .where({ id })
      .save(extractedParams, {
        method: 'update'
      });
  },

  deactivateUserById: (params, Model) => {
    const {
      id
    } = params;

    return new Model()
      .where({ id })
      .save({
        is_active: false
      }, {
        method: 'update'
      });
  }
};
