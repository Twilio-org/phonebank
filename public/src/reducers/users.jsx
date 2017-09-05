export const defaultUserAccountInfo = {
  first_name: null,
  last_name: null,
  email: null,
  phone_number: null,
  is_admin: null,
  user_call_sid: null
};

export const SET_USER_ACCOUNT_INFO = 'SET_USER_ACCOUNT_INFO';
export const SET_USER_CALL_SID = 'SET_USER_CALL_SID';

export function accountInfoReducer(state = defaultUserAccountInfo, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_USER_ACCOUNT_INFO:
      return {
        ...state,
        first_name: payload.first_name,
        last_name: payload.last_name,
        email: payload.email,
        phone_number: payload.phone_number,
        is_admin: payload.is_admin
      };
    case SET_USER_CALL_SID:
      return {
        ...state,
        user_call_sid: payload
      };
    default:
      return state;
  }
}

