import Call from '../models/calls';

export default {
  populateCalls: (params) => {
    const { campaign_id, contact_id } = params;

    return new Call({ campaign_id, contact_id }).save();
  }
};
