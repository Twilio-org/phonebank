import Call from '../models/calls';

export default {
  assignCall: (params) => {
    const { user_id, campaign_id } = params;

    return new Call()
      .where({ campaign_id, user_id, status: 'ASSIGNED' })
      .orderBy('updated_at', 'DESC')
      .fetchAll()
      .then((calls) => {
        if (calls.length <= 1) {
          return new Call()
            .where({ campaign_id, status: 'AVAILABLE' })
            .orderBy('updated_at', 'ASC')
            .fetch()
            .then((call) => {
              if (call) {
                return call.save({ user_id, status: 'ASSIGNED', updated_at: new Date() }, { patch: true })
                  .then(savedCall => savedCall)
                  .catch(err => console.log('Error in call service when assigning to user: ', err));
              }
              return null;
            })
            .catch(err => console.log('Error in call service when finding call to assign:', err));
        }
        return calls.pop();
      });
  },

  createNewAttempt: (params) => {
    const { attempt_num, campaign_id, contact_id } = params;
    return new Call({ attempt_num, campaign_id, contact_id }).save();
  },

  getCallById: (params) => {
    const { id } = params;
    return new Call({ id })
    .fetch()
    .then(call => call)
    .catch(err => console.log(err));
  },

  populateCall: (params) => {
    const { campaign_id, contact_id } = params;

    return new Call({ campaign_id, contact_id }).save();
  },

  updateCallStatus: (params) => {
    const { id, status } = params;
    return new Call({ id })
      .save({ status, updated_at: new Date() }, { patch: true })
      .then(call => call)
      .catch(err => err);
  },

  recordAttempt: (params) => {
    const { id, notes, outcome } = params;
    return new Call({ id })
      .save({ notes, outcome, status: 'ATTEMPTED', updated_at: new Date() }, { patch: true })
      .then(call => call)
      .catch(err => console.log(err));
  },

  releaseCall: (params) => {
    const { id } = params;
    return new Call({ id })
      .save({ status: 'AVAILABLE', user_id: null, updated_at: new Date() }, { patch: true })
      .then(call => call)
      .catch(err => console.log('error in calls service when releasing call: ', err));
  },

  updateContactCall: (params) => {
    const { id, call_sid } = params;
    const duration = parseInt(params.duration, 10);
    return new Call({ id })
      .save({ call_sid, duration, updated_at: new Date() }, { patch: true })
      .then(call => call)
      .catch(err => err);
  },

  getCallsNotAttemptedByCampaignId: (params) => {
    const { campaign_id } = params;
    return new Call()
      .where({ campaign_id })
      .query('where', 'status', '<>', 'ATTEMPTED')
      .fetchAll()
      .then(calls => calls)
      .catch(err => console.log(`Error in fetching calls not attempted by campaing_id: ${err}`));
  }
};
