import Call from '../models/calls';

export default {
  populateCall: (params) => {
    const { campaign_id, contact_id } = params;

    return new Call({ campaign_id, contact_id }).save();
  },

  assignCall: (params) => {
    const { user_id, campaign_id } = params;

    return new Call()
      .where({ campaign_id, status: 'available' })
      .fetch().then((call) => {
        if (call) {
          return call.save({ user_id, status: 'assigned' }, { patch: true })
            .then(savedCall => savedCall);
        }

        return null;
      });
  }
};
