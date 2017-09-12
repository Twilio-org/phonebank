import axios from 'axios';

import { SET_CALL_CURRENT,
         CLEAR_CALL_CURRENT,
         UPDATE_CALL_STATUS,
         UPDATE_CALL_OUTCOME,
         SET_CALL_CONTACT_INFO,
         SET_VOLUNTEER_CALL_ACTIVE,
         CLEAR_VOLUNTEER_CALL_ACTIVE } from '../reducers/calls';

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
  .catch(err => err);
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
    .catch(err => err);
}

export function initateTwilioCon(userId, campaignId) {
  return dispatch => axios.post(`/users/${userId}/campaigns/${campaignId}/calls`, null, {
    headers: { Authorization: ` JWT ${localStorage.getItem('auth_token')}` }
  })
  .then((res) => {
    const { data: userObj } = res;
    const { call_sid } = userObj;
    if (call_sid) {
      return dispatch(setVolunteerActive());
    }
    return new Error('error with initiating twilio connection, no call_sid on user object');
  })
  .catch(err => err);
}

export function endTwilioCon(userId, campaignId) {
  return dispatch => axios.delete(`/users/${userId}/campaigns/${campaignId}/calls`, {
    headers: { Authorization: ` JWT ${localStorage.getItem('auth_token')}` }
  })
  .then((res) => {
    const { data: userObj } = res;
    const { call_sid } = userObj;
    if (!call_sid) {
      return dispatch(clearVolunteerActive());
    }
    return new Error('error disconnecting from twilio, call_sid still present');
  })
  .catch(err => err);
}

export function checkTwilioCon(params, initiateCall = initateTwilioCon, endCall = endTwilioCon) {
  const { userId, campaignId, action } = params;
  return dispatch => axios.get(`/users/${userId}`, {
    headers: { Authorization: ` JWT ${localStorage.getItem('auth_token')}` }
  })
  .then((res) => {
    const { data: userObj } = res;
    const { call_sid } = userObj;
    const connected = !!call_sid;
    if (action === 'connect') {
      if (!connected) {
        return dispatch(initiateCall(userId, campaignId));
      }
      return new Error('twilio call connection already active.');
    }
    if (action === 'disconnect') {
      if (connected) {
        return dispatch(endCall(userId, campaignId));
      }
      return new Error('twilio call connection not active, cannot complete request.');
    }
    return new Error('invalid action for reqest to connect to Twilio');
  })
  .catch(err => err);
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
    dispatch(endTwilioCon(userId, campaignId));
    return dispatch(clearCurrentCall());
  })
  .catch(err => err);
}

export function updateCallAttempt(callUpdateParams, assignCall = assignToCall) {
  const { user_id: userId,
          campaign_id: campaignId,
          call_id: callId,
          status,
          outcome,
          notes } = callUpdateParams;
  const params = { status, outcome, notes };
  return dispatch => axios.put(`/users/${userId}/campaigns/${campaignId}/calls/${callId}`,
    params,
    {
      headers: { Authorization: ` JWT ${localStorage.getItem('auth_token')}` }
    }
  )
  .then((currentCall) => {
    const { call: currentCallObj } = currentCall.data;
    const { status: currentCallStatus } = currentCallObj;
    if (currentCallStatus === 'ATTEMPTED') {
      return dispatch(assignCall(userId, campaignId));
    }
    return dispatch(updateCallStatus(currentCallStatus));
  })
  .catch(err => err);
}
