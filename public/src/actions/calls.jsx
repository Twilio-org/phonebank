import axios from 'axios';

import { SET_CALL_CURRENT, SET_CALL_NEXT, INCREMENT_CALLS, CLEAR_CALL_CURRENT, CLEAR_NEXT_CALL, CLEAR_COUNT_CALLS, PROMOTE_NEXT, UPDATE_CALL_STATUS, UPDATE_CALL_OUTCOME } from '../reducers/calls';

export function incrementCallCount() {
  return {
    type: INCREMENT_CALLS
  };
}
export function promoteNextToCurrent() {
  return {
    type: PROMOTE_NEXT
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

export function assignToCall(userId, campaignId, currentCall) {
  return dispatch => axios.post(`/users/${userId}/campaigns/${campaignId}/calls`, null,
    {
      headers: { Authorization: ` JWT ${localStorage.getItem('auth_token')}` }
    }
  )
    .then((call) => {
      console.log('call: ', call);
      const { data: callObj } = call;
      return !currentCall ? dispatch(setCurrentCall(callObj)) : dispatch(setNextCall(callObj));
    })
    .catch(err => console.log(err));
}
