export const SET_USERS = 'SET_USERS';
export const SET_USER_CURRENT = 'SET_USER_CURRENT';

export const defaultUsers = {
  current_user: {},
  all_users: []
};

export function adminUsersReducer(state = defaultUsers, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_USERS:
      return {
        ...state,
        all_users: payload
      };
    case SET_USER_CURRENT:
      return {
        ...state,
        current_user: payload
      };
    default:
      return state;
  }
}
