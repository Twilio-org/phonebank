export const defaultAuthStatus = {
  id: null
};

export const CLEAR_AUTH = 'CLEAR_AUTH';
export const SET_AUTH_JWT_FULFILLED = 'SET_AUTH_JWT_FULFILLED';
export const LOGOUT_USER = 'LOGOUT_USER';

export function authStatusReducer(state = defaultAuthStatus, action) {
  const { type, payload } = action;
  switch (type) {
    case CLEAR_AUTH:
      return {
        ...state,
        ...defaultAuthStatus
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
