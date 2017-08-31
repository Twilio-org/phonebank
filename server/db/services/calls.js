import Call from '../models/calls';

export default {
  assignCall: (params) => {
    const { user_id, campaign_id } = params;

    return new Call()
      .where({ campaign_id, status: 'AVAILABLE' })
      .fetch().then((call) => {
        if (call) {
          return call.save({ user_id, status: 'ASSIGNED' }, { patch: true })
            .then(savedCall => savedCall);
        }

        return null;
      });
  }
};
