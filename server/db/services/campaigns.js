export default {
  saveNewCampaign: (params, Model) => {
    const { name, title, description, status, script_id } = params;

    return new Model({ name, title, description, status, script_id }).save();
  },

  getAllCampaigns: (params, Model) =>
    new Model().fetchAll()
};
