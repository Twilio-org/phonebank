const userAccountInfo = {
  first_name: null,
  last_name: null,
  email: null,
  phone_number: null,
  is_admin: null
};

export const SET_USER_ACCOUNT_INFO = 'SET_USER_ACCOUNT_INFO';

export function accountInfoReducer(state = userAccountInfo, action) {
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
    default:
      return state;
  }
}

