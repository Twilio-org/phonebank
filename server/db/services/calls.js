import Call from '../models/calls';

export default {
  recordAttempt: (params) => {
    const { id, notes, outcome } = params;
    return new Call({ id })
      .save({ notes, outcome }, { patch: true })
      .then(call => call)
      .catch(err => console.log(err));
  },
  createNewAttempt: (params) => {
    const { attemp_num, campaign_id, contact_id } = params;
    return new Call({ attemp_num, campaign_id, contact_id }).save();
  },
  getCallById: (params) => {
    const { id } = params;
    return new Call({ id })
    .fetch()
    .then(call => call)
    .catch(err => console.log(err));
  }
};
