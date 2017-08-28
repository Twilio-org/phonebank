import axios from 'axios';
import { SET_USERS, SET_USER_CURRENT } from '../reducers/admin_users';

export function setUserList(usersList) {
  return {
    type: SET_USERS,
    payload: usersList
  };
}

export function setCurrentUser(userObject) {
  return {
    type: SET_USER_CURRENT,
    payload: userObject
  };
}

export function fetchAllUsers(currentUserId) {
  return dispatch => axios.get('/users', {
    headers: { Authorization: ` JWT ${localStorage.getItem('auth_token')}` }
  })
  .then((users) => {
    const { data: usersList } = users;
    const modifiedUsersList = usersList.map((userObject) => {
      const { is_admin, is_banned, is_active } = userObject;
      return {
        ...userObject,
        is_admin: is_admin.toString(),
        is_banned: is_banned.toString(),
        is_active: is_active.toString()
      };
    });
    // remove the current user from the user's list... so they don't accidentally
    // change their status from admin to volunteer and have all the bugs happen
    const filteredUsersList = modifiedUsersList.filter((object) => {
      const { id } = object;
      return id !== currentUserId;
    });
    return dispatch(setUserList(filteredUsersList));
  })
  .catch(err => console.log('problem fetching all users from db in action "fetchAllUsers"', err));
}

export function adminUpdateUserInfo(id, target, newValue, currentUserId, fetchAll = fetchAllUsers) {
  const params = {};
  params[target] = JSON.stringify(newValue);
  return dispatch => axios.put(`/users/${id}/manage`, params,
    {
      headers: { Authorization: ` JWT ${localStorage.getItem('auth_token')}` }
    }
  )
  .then(() => {
    dispatch(fetchAll(currentUserId));
  })
  .catch(err => console.log('error with user management update action: ', err));
}
