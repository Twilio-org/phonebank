import axios from 'axios';

import { SET_CALL_CURRENT, SET_CALL_NEXT, INCREMENT_CALLS, CLEAR_CALL_CURRENT, CLEAR_NEXT_CALL, CLEAR_INC_CALLS, PROMOTE_NEXT } from '../reducers/calls';

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

export function clearCallIncrement() {
  return {
    type: CLEAR_INC_CALLS,
    payload: undefined
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
    type: CLEAR_NEXT_CALL,
    payload: undefined
  };
}

export function clearCurrentCall() {
  return {
    type: CLEAR_CALL_CURRENT,
    payload: undefined
  };
}

export function assignToCall(userId, campaignId, currentCall) {
  return dispatch => axios.post(`/users/${userId}/campaigns/${campaignId}/calls`)
    .then((call) => {
      const { data: callObj } = call;
      return !currentCall ? dispatch(setCurrentCall(callObj)) : dispatch(setNextCall(callObj));
    })
    .catch(err => console.log(err));
}
