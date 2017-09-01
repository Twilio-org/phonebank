import axios from 'axios';

import { SET_CALL_CURRENT, SET_CALL_NEXT, INCREMENT_CALLS, CLEAR_CALL_CURRENT, CLEAR_NEXT_CALL, CLEAR_COUNT_CALLS, UPDATE_CALL_STATUS, UPDATE_CALL_OUTCOME, SET_CALL_CONTACT_INFO } from '../reducers/calls';

export function incrementCallCount() {
  return {
    type: INCREMENT_CALLS
  };
}


export function setCurrentCall(callObj) {
  return {
    type: SET_CALL_CURRENT,
    payload: callObj
  };
}

export function setNextCall(nextCallObj) {
  return {
    type: SET_CALL_NEXT,
    payload: nextCallObj
  };
}

export function clearNextCall() {
  return {
    type: CLEAR_NEXT_CALL
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

export function setContactInfo(contactInfo) {
  return {
    type: SET_CALL_CONTACT_INFO,
    payload: contactInfo
  };
}

export function getContactInfo(contactId) {
  return dispatch => axios.get(`/contacts/${contactId}`,
    {
      headers: { Authorization: ` JWT ${localStorage.getItem('auth_token')}` }
    }
  )
  .then((contact) => {
    const { data: contactObj } = contact;
    const { name, phone_number } = contactObj;
    dispatch(setContactInfo({ name, phone_number }));
  }).catch();
}

export function assignToCall(userId, campaignId, currentCall) {
  return dispatch => axios.post(`/users/${userId}/campaigns/${campaignId}/calls`, null,
    {
      headers: { Authorization: ` JWT ${localStorage.getItem('auth_token')}` }
    }
  )
    .then((call) => {
      const { data: callObj } = call;
      const { status, outcome } = callObj;
      dispatch(setCurrentCall(callObj));
      dispatch(updateCallOutcome(outcome));
      dispatch(updateCallStatus(status));
    })
    .catch(err => console.log(err));
}
