import Call from '../models/calls';
import { hangUp } from '../../util/twilio';


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
  }
};
