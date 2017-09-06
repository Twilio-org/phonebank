import axios from 'axios';

import { SET_CALL_CURRENT,
         CLEAR_CALL_CURRENT,
         UPDATE_CALL_STATUS,
         UPDATE_CALL_OUTCOME,
         SET_CALL_CONTACT_INFO,
         SET_CURRENT_CALL_ACTIVE,
         SET_CURRENT_CALL_INACTIVE,
         SET_VOLUNTEER_ACTIVE,
         CLEAR_VOLUNTEER_ACTIVE } from '../reducers/calls';

export function setVolunteerActive() {
  return {
    type: SET_VOLUNTEER_ACTIVE
  };
}

export function clearVolunteerActive() {
  return {
    type: CLEAR_VOLUNTEER_ACTIVE
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
      const { status, outcome } = callObj;
      console.log('status and outcome: ', status, outcome);
      if (status !== 'ASSIGNED' || outcome !== 'PENDING') {
        return new Error('error from db assignment');
      }
      return dispatch(setCurrentCall(callObj));
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

// TODO: waiting for backend to be modified to accept status puts
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
