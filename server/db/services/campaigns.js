import Campaign from '../models/campaigns';

export default {
  saveNewCampaign: (params) => {
    const { name, title, description, status, script_id, contact_lists_id } = params;

    return new Campaign({ name, title, description, status, script_id, contact_lists_id }).save();
  },

  getAllCampaigns: (status) => {
    if (status === 'all') {
      return new Campaign()
        .orderBy('id', 'DESC')
        .fetchAll();
    }
    return new Campaign()
      .where({ status })
      .orderBy('id', 'DESC')
      .fetchAll();
  },

  getCampaignById: (params) => {
    const { id } = params;

    return new Campaign({ id })
      .fetch();
  },

  updateCampaignStatus(params) {
    const { id, status } = params;
    return new Campaign({ id })
      .save({ status }, { patch: true })
      .then(campaign => campaign)
      .catch(err => err);
  }
};
