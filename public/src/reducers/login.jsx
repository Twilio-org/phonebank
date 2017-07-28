const authStatus = {
  id: null
};

export const CLEAR_AUTH = 'CLEAR_AUTH';
export const SET_AUTH_JWT_FULFILLED = 'SET_AUTH_JWT_FULFILLED';
export const LOGOUT_USER = 'LOGOUT_USER';

export function authStatusReducer(state = authStatus, action) {
  const { type, payload } = action;
  switch (type) {
    case CLEAR_AUTH:
      return {
        ...state,
        ...authStatus
      };
    case SET_AUTH_JWT_FULFILLED:
      return {
        ...state,
        id: payload.id
      };
    default:
      return state;
  }
}
