import axios from 'axios';
import { destroy } from 'redux-form';
import helper from '../helpers/serializer';

import { SET_CALL_CURRENT,
         CLEAR_CALL_CURRENT,
         UPDATE_CALL_STATUS,
         UPDATE_CALL_OUTCOME,
         SET_CALL_CONTACT_INFO,
         SET_VOLUNTEER_CALL_ACTIVE,
         CLEAR_VOLUNTEER_CALL_ACTIVE,
         SEND_CALL_RESPONSES } from '../reducers/calls';

export function setVolunteerActive() {
  return {
    type: SET_VOLUNTEER_CALL_ACTIVE
  };
}

export function clearVolunteerActive() {
  return {
    type: CLEAR_VOLUNTEER_CALL_ACTIVE
  };
}

export function setCurrentCall(callObj) {
  return {
    type: SET_CALL_CURRENT,
    payload: callObj
  };
}

export function clearCurrentCall() {
  return { type: CLEAR_CALL_CURRENT };
}

export function updateCallOutcome(outcome) {
  return {
    type: UPDATE_CALL_OUTCOME,
    payload: outcome.toUpperCase()
  };
}

export function updateCallStatus(status) {
  return {
    type: UPDATE_CALL_STATUS,
    payload: status.toUpperCase()
  };
}

export function setCallContactInfo(contactInfo) {
  return {
    type: SET_CALL_CONTACT_INFO,
    payload: contactInfo
  };
}

export function sendCallResponseData() {
  return { type: SEND_CALL_RESPONSES };
}

export function getCallContactInfo(contactId) {
  return dispatch => axios.get(`/contacts/${contactId}`,
    {
      headers: { Authorization: ` JWT ${localStorage.getItem('auth_token')}` }
    }
  )
  .then((contact) => {
    const { data: contactObj } = contact;
    const { first_name, last_name } = contactObj;
    const name = last_name ? `${first_name} ${last_name}` : first_name;
    dispatch(setCallContactInfo({ name }));
  })
  .catch(err => console.log(err));
}

export function assignToCall(userId, campaignId) {
  return dispatch => axios.get(`/users/${userId}/campaigns/${campaignId}/calls`,
    {
      headers: { Authorization: ` JWT ${localStorage.getItem('auth_token')}` }
    }
  )
    .then((call) => {
      const { data: callObj } = call;
      const { status, outcome } = callObj;
      if (status !== 'ASSIGNED') {
        return new Error('Invalid call status, problem with call assignment.');
      }
      if (outcome !== 'PENDING') {
        return new Error('Invalid outcome, problem with call assignment.');
      }
      return dispatch(setCurrentCall(callObj));
    })
    .catch(err => console.log(err));
}

export function releaseCall(userId, campaignId, callId, currentCallStatus, next = false) {
  if (currentCallStatus !== 'ASSIGNED') {
    return new Error('Error with releaseCall: cannot releave a call that is active.');
  }
  return dispatch => axios.delete(`/users/${userId}/campaigns/${campaignId}/calls/${callId}`,
    {
      headers: { Authorization: ` JWT ${localStorage.getItem('auth_token')}` }
    }
  )
  .then(() => {
    if (next) {
      return dispatch(assignToCall(userId, campaignId));
    }
    return dispatch(clearCurrentCall());
  })
  .catch(err => err);
}

export function updateCallAttempt(userId, campaignId, callId, outcome, notes = null) {
  const params = { outcome, notes };
  return dispatch => axios.put(`/users/${userId}/campaigns/${campaignId}/calls/${callId}`,
    params,
    {
      headers: { Authorization: ` JWT ${localStorage.getItem('auth_token')}` }
    }
  )
  .then(() => {
    dispatch(assignToCall(userId, campaignId));
  })
  .catch();
}

export function submitCallResponses(data) {
  const { user_id, campaign_id, call_id, outcome, responses, notes } = data;
  const serializedResponses = helper.ResponsesSerializer(responses);
  const responseData = { outcome, notes, responses: serializedResponses };
  const path = `/users/${user_id}/campaigns/${campaign_id}/calls/${call_id}`;
  const auth = { headers: { Authorization: ` JWT ${localStorage.getItem('auth_token')}` } };

  return (dispatch) => {
    // debugger;
    axios.put(path, responseData, auth)
    .then(() => {
      dispatch(sendCallResponseData());
      dispatch(destroy('CallResponse'));
      dispatch(clearCurrentCall());
    })
    .catch((err) => {
      const customError = {
        message: `error in submitting call responses: ${err}`,
        name: 'submitCallResponses function error in actions/calls.jsx'
      };
      throw customError;
    });
  };
}
