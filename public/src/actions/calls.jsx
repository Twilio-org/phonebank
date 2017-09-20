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
         DISABLE_CALL_CONTROL,
         ENABLE_CALL_CONTROL } from '../reducers/calls';

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

export function disableCallControl() {
  return {
    type: DISABLE_CALL_CONTROL
  };
}

export function enableCallControl() {
  return {
    type: ENABLE_CALL_CONTROL
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
    .then((response) => {
      const { data: callObj } = response;
      const { status, outcome } = callObj;
      if (status !== 'ASSIGNED') {
        return new Error('Invalid call status, problem with call assignment.');
      }
      if (outcome !== 'PENDING') {
        return new Error('Invalid outcome, problem with call assignment.');
      }
      return dispatch(setCurrentCall(callObj));
    })
    .catch((err) => {
      if (err.response && err.response.status === 404) {
        return dispatch(disableCallControl());
      }
      return err;
    });
}

export function initateTwilioCon(userId, campaignId) {
  return dispatch => axios.get(`/users/${userId}`, {
    headers: { Authorization: ` JWT ${localStorage.getItem('auth_token')}` }
  })
  .then((res) => {
    const { data: userObj } = res;
    const { call_sid } = userObj;
    const connected = !!call_sid;
    if (!connected) {
      axios.post(`/users/${userId}/campaigns/${campaignId}/calls`, null, {
        headers: { Authorization: ` JWT ${localStorage.getItem('auth_token')}` }
      })
      .then((connectionRes) => {
        const { data: connectionUserObj } = connectionRes;
        const { call_sid: userCallSid } = connectionUserObj;
        if (userCallSid) {
          return dispatch(setVolunteerActive());
        }
        return new Error('error with initiating twilio connection, no call_sid on user object');
      })
      .catch(err => err);
    }
    return new Error('twilio call connection already active.');
  })
  .catch(err => err);
}

export function endTwilioCon(userId, campaignId) {
  return dispatch => axios.get(`/users/${userId}`, {
    headers: { Authorization: ` JWT ${localStorage.getItem('auth_token')}` }
  })
  .then((res) => {
    const { data: userObj } = res;
    const { call_sid } = userObj;
    if (call_sid) {
      axios.delete(`/users/${userId}/campaigns/${campaignId}/calls`, {
        headers: { Authorization: ` JWT ${localStorage.getItem('auth_token')}` }
      })
      .then((disconnectRes) => {
        const { data: disconnectUserObj } = disconnectRes;
        const { userCallSid } = disconnectUserObj;
        if (!userCallSid) {
          return dispatch(clearVolunteerActive());
        }
        return new Error('error disconnecting from twilio, call_sid still present');
      })
      .catch(err => err);
    }
    return new Error('twilio connection not active');
  })
  .catch(err => err);
}

export function releaseCall(userId, campaignId, callId, currentCallStatus) {
  if (currentCallStatus && currentCallStatus !== 'ASSIGNED') {
    return new Error('Error with releaseCall: cannot releave a call that is active.');
  }
  return () => axios.delete(`/users/${userId}/campaigns/${campaignId}/calls/${callId}`,
    {
      headers: { Authorization: ` JWT ${localStorage.getItem('auth_token')}` }
    }
  )
  .then()
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
  .then(() => {
    if (status === 'ATTEMPTED') {
      return dispatch(assignCall(userId, campaignId));
    }
    return dispatch(updateCallStatus(status));
  })
  .catch(err => console.log(err));
}

export function submitCallResponses(data) {
  const { user_id, campaign_id, call_id, outcome, responses, notes, status } = data;
  const serializedResponses = outcome === 'ANSWERED' ? helper.ResponsesSerializer(responses) : null;
  const responseData = serializedResponses ?
    { outcome, notes, responses: serializedResponses, status } : { outcome, notes, status };

  const path = `/users/${user_id}/campaigns/${campaign_id}/calls/${call_id}`;
  const auth = { headers: { Authorization: ` JWT ${localStorage.getItem('auth_token')}` } };

  return (dispatch) => {
    axios.put(path, responseData, auth)
    .then(() => {
      dispatch(destroy('CallResponse'));
      dispatch(clearCurrentCall());
    })
    .catch((err) => {
      const customError = {
        message: `error in submitting call responses: ${err}`,
        name: 'submitCallResponses function error in actions/calls.jsx'
      };
      return customError;
    });
  };
}
