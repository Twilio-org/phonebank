const defaultCalls = {
  current_call: undefined,
  next_call: undefined,
  calls_made: 0
};

export const SET_CALL_CURRENT = 'SET_CALL_CURRENT';
export const SET_CALL_NEXT = 'SET_CALL_NEXT';
export const INCREMENT_CALLS = 'INCREMENT_CALLS';
export const CLEAR_CALL_CURRENT = 'CLEAR_CALL_CURRENT';
export const CLEAR_NEXT_CALL = 'CLEAR_NEXT_CALL';
export const CLEAR_COUNT_CALLS = 'CLEAR_COUNT_CALLS';
export const PROMOTE_NEXT = 'PROMOTE_NEXT';

export function volunteerCallsReducer(state = defaultCalls, action) {
  const { type, payload } = action;
  // for switching call from next to current;
  const { next_call } = state;
  switch (type) {
    case SET_CALL_CURRENT:
      return {
        ...state,
        current_call: payload
      };
    case SET_CALL_NEXT:
      return {
        ...state,
        next_call: payload
      };
    case PROMOTE_NEXT:
      return {
        ...state,
        current_call: next_call,
        next_call: undefined
      };
    case INCREMENT_CALLS:
      return {
        ...state,
        calls_made: state.calls_made + 1
      };
    case CLEAR_CALL_CURRENT:
      return {
        ...state,
        current_call: undefined
      };
    case CLEAR_NEXT_CALL:
      return {
        ...state,
        next_call: undefined
      };
    case CLEAR_COUNT_CALLS:
      return {
        ...state,
        calls_made: payload
      };
    default:
      return state;
  }
}
