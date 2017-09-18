import Call from '../models/calls';

export default {
  assignCall: (params) => {
    const { user_id, campaign_id } = params;

    return new Call()
      .where({ campaign_id, status: 'AVAILABLE' })
      .orderBy('id', 'ASC')
      .fetch()
      .then((call) => {
        if (call) {
          return call.save({ user_id, status: 'ASSIGNED' }, { patch: true })
            .then(savedCall => savedCall)
            .catch(err => console.log('Error in call service when assigning to user: ', err));
        }

        return null;
      })
      .catch(err => console.log('Error in call service when finding call to assign:', err));
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
      .save({ status }, { patch: true })
      .then(call => call)
      .catch(err => err);
  },

  recordAttempt: (params) => {
    const { id, notes, outcome } = params;
    return new Call({ id })
      .save({ notes, outcome, status: 'ATTEMPTED' }, { patch: true })
      .then(call => call)
      .catch(err => console.log(err));
  },

  releaseCall: (params) => {
    const { id } = params;
    return new Call({ id })
      .save({ status: 'AVAILABLE', user_id: null }, { patch: true })
      .then(call => call)
      .catch(err => console.log('error in calls service when releasing call: ', err));
  },

  updateContactCallSid: (params) => {
    const { id, call_sid } = params;
    return new Call({ id })
      .save({ call_sid }, { patch: true })
      .then(call => call)
      .catch(err => err);
  },

  getCallsNotAttemptedByCampaignId: (params) => {
    const { campaign_id } = params;
    console.log('campaign_id is: ', campaign_id);
    return new Call()
      .where({ campaign_id })
      .query('where', 'status', '<>', 'ATTEMPTED')
      .fetchAll()
      .then((calls) => {
        calls.forEach(call => console.log('not attempted status **** is: ', call.attributes.status, call.attributes.campaign_id, call.attributes.id));
        return calls;
      })
      .catch(err => console.log(`Error in fetching calls not attempted by campaing_id: ${err}`));
  },

  getCallsByCampaignId: (params) => {
    const { campaign_id } = params;
    return Call.forge()
      .where({ campaign_id })
      .fetchAll()
      .then(calls => calls)
      .catch(err => `Error in fetching all calls by campaign_id: ${err}`);
  }
};
