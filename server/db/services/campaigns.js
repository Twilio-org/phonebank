import Campaign from '../models/campaigns';

export default {
  saveNewCampaign: (params) => {
    const { name, title, description, status, script_id, contact_lists_id } = params;

    return new Campaign({ name, title, description, status, script_id, contact_lists_id }).save();
  },

  getAllCampaigns: () => new Campaign().fetchAll()
};
