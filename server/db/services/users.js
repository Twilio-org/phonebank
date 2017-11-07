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

  getUserWithCampaignsAndCallsById: (params) => {
    const { id } = params;

    return new User({ id })
      .fetch({ withRelated: ['campaigns', 'calls'] })
      .then(user => user);
  },

  updateUserById: (params) => {
    const { id } = params;
    const extractedParams = {
      first_name: params.firstName,
      last_name: params.lastName,
      password_hash: params.password,
      phone_number: params.phoneNumber,
      email: params.email,
      is_admin: params.isAdmin,
      is_active: params.isActive,
      is_banned: params.isBanned,
      call_sid: params.call_sid
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

  getAllUsers: () => new User().fetchAll(),

  getUserCampaigns: (params) => {
    const { id } = params;

    return new User({ id }).fetch()
      .then(user => user.related('campaigns').fetch()
        .then(campaigns => campaigns));
  },

  addCampaignToUser: (params) => {
    const { id, campaign_id } = params;
    return new User({ id })
      .campaigns().attach({ campaign_id, user_id: id });
  },

  getUserCampaignAssociation: (params) => {
    const { id, campaign_id } = params;
    return new User({ id }).campaigns().query({ where: { campaign_id } }).fetchOne()
      .then(campaign => campaign);
  },

  clearUserCallSID: (params) => {
    const { id } = params;
    const extractedParams = {
      call_sid: null
    };
    return new User()
      .where({ id })
      .save(extractedParams, {
        method: 'update'
      });
  }
};
