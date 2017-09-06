const defaultCalls = {
  current_call: false,
  call_id: null,
  user_id: null,
  campaign_id: null,
  call_sid: null,
  contact_id: null,
  status: undefined,
  outcome: undefined,
  call_ended: null,
  call_started: null,
  notes: null,
  contact_name: undefined,
  call_active: false
};

export const SET_CALL_CURRENT = 'SET_CALL_CURRENT';
export const CLEAR_CALL_CURRENT = 'CLEAR_CALL_CURRENT';
export const UPDATE_CALL_STATUS = 'UPDATE_CALL_STATUS';
export const UPDATE_CALL_OUTCOME = 'UPDATE_CALL_OUTCOME';
export const SET_CALL_CONTACT_INFO = 'SET_CALL_CONTACT_INFO';
export const SET_CURRENT_CALL_ACTIVE = 'SET_CURRENT_CALL_ACTIVE';
export const SET_CURRENT_CALL_INACTIVE = 'SET_CURRENT_CALL_INACTIVE';


export function volunteerCallsReducer(state = defaultCalls, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_CALL_CURRENT:
      return {
        ...state,
        current_call: true,
        call_id: payload.id,
        user_id: payload.user_id,
        campaign_id: payload.campaign_id,
        call_sid: payload.call_sid,
        contact_id: payload.contact_id,
        status: payload.status,
        outcome: payload.outcome,
        call_ended: payload.call_ended,
        call_started: payload.call_started,
        notes: payload.notes
      };
    case SET_CURRENT_CALL_ACTIVE:
      return {
        ...state,
        call_active: true
      };
    case SET_CURRENT_CALL_INACTIVE:
      return {
        ...state,
        call_active: false
      };
    case CLEAR_CALL_CURRENT:
      return {
        ...state,
        ...defaultCalls
      };
    case UPDATE_CALL_STATUS:
      return {
        ...state,
        status: payload
      };
    case UPDATE_CALL_OUTCOME:
      return {
        ...state,
        outcome: payload
      };
    case SET_CALL_CONTACT_INFO:
      return {
        ...state,
        contact_name: payload.name
      };
    default:
      return state;
  }
}
