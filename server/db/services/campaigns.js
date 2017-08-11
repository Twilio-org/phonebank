export default {
  saveNewCampaign: (params, Model) => {
    const { name, title, description, status, script_id, contact_lists_id } = params;

    return new Model({ name, title, description, status, script_id, contact_lists_id }).save();
  },

  getAllCampaigns: (params, Model) =>
    new Model().fetchAll()
};
