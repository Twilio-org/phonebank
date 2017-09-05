import axios from 'axios';

import { SET_CALL_CURRENT,
         INCREMENT_CALLS,
         CLEAR_CALL_CURRENT,
         CLEAR_COUNT_CALLS,
         UPDATE_CALL_STATUS,
         UPDATE_CALL_OUTCOME,
         SET_CALL_CONTACT_INFO,
         SET_CURRENT_CALL_ACTIVE,
         SET_CURRENT_CALL_INACTIVE } from '../reducers/calls';

export function incrementCallCount() {
  return {
    type: INCREMENT_CALLS
  };
}

export function setCurrentCallActive() {
  return {
    type: SET_CURRENT_CALL_ACTIVE
  };
}

export function setCurrentCallInactive() {
  return {
    type: SET_CURRENT_CALL_INACTIVE
  };
}

export function setCurrentCall(callObj) {
  return {
    type: SET_CALL_CURRENT,
    payload: callObj
  };
}


export function clearCallIncrement() {
  return {
    type: CLEAR_COUNT_CALLS,
    payload: 0
  };
}

export function clearCurrentCall() {
  return {
    type: CLEAR_CALL_CURRENT
  };
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
  return dispatch => axios.post(`/users/${userId}/campaigns/${campaignId}/calls`, null,
    {
      headers: { Authorization: ` JWT ${localStorage.getItem('auth_token')}` }
    }
  )
    .then((call) => {
      const { data: callObj } = call;
      dispatch(setCurrentCall(callObj));
    })
    .catch(err => console.log(err));
}

export function releaseCall(userId, campaignId, callId) {
  return dispatch => axios.delete(`/users/${userId}/campaigns/${campaignId}/calls/${callId}`,
    {
      headers: { Authorization: ` JWT ${localStorage.getItem('auth_token')}` }
    }
  )
  .then(() => {
    dispatch(setCurrentCallInactive());
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
