import User from '../models/users';

export default {
  saveNewUser: (params) => {
    const extractedParams = {
      first_name: params.firstName,
      last_name: params.lastName,
      password_hash: params.password,
      phone_number: params.phoneNumber,
      email: params.email
    };

    return new User(extractedParams).save();
  },

  getUserByEmail: (params) => {
    const { email } = params;

    return new User({ email })
      .fetch();
  },

  getUserById: (params) => {
    const { id } = params;

    return new User({ id })
      .fetch();
  },

  updateUserById: (params) => {
    const { id } = params;
    const extractedParams = {
      first_name: params.firstName,
      last_name: params.lastName,
      password_hash: params.password,
      phone_number: params.phoneNumber,
      email: params.email
    };
    return new User()
      .where({ id })
      .save(extractedParams, {
        method: 'update'
      });
  },

  deactivateUserById: (params) => {
    const { id } = params;

    return new User()
      .where({ id })
      .save({
        is_active: false
      }, {
        method: 'update'
      });
  },

  getAllUsers: () => new User().fetchAll()
};
