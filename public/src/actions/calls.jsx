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
  console.log('SET CALL CURRENT RUNNING WITH THIS CALL: ', callObj);
  return {
    type: SET_CALL_CURRENT,
    payload: callObj
  };
}

export function clearCurrentCall() {
  console.log('SHOULD BE CLEARING THE CURRENT CALL');
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
  console.log('SETTING CONTACT INFO: ', contactInfo);
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
  return dispatch => axios.get(`/users/${userId}/campaigns/${campaignId}/calls`,
    {
      headers: { Authorization: ` JWT ${localStorage.getItem('auth_token')}` }
    }
  )
    .then((call) => {
      const { data: callObj } = call;
      const { status, outcome } = callObj;
      console.log('SHOULD BE NEW CALL: ', callObj.id, status);
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
  debugger;
  if (currentCallStatus !== 'ASSIGNED') {
    return new Error('Error with releaseCall: cannot releave a call that is active.');
  }
  return dispatch => axios.delete(`/users/${userId}/campaigns/${campaignId}/calls/${callId}`,
    {
      headers: { Authorization: ` JWT ${localStorage.getItem('auth_token')}` }
    }
  )
  .then(() => {
    // if (next) {
    //   console.log('AFTER RELEASE CALL, SHOULD ASSIGN: ', userId, campaignId, 'old callid: ', callId);
    //   return dispatch(assignToCall(userId, campaignId));
    // }
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
  .catch();
}
