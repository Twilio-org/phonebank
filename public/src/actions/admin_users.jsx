import axios from 'axios';
import { SET_USERS, SET_USER_CURRENT } from '../reducers/admin_users';

export function setCurrentUser(userObject) {
  return {
    type: SET_USER_CURRENT,
    payload: userObject
  };
}

export function setUserList(usersList) {
  return {
    type: SET_USERS,
    payload: usersList
  };
}

export function fetchAllUsers() {
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
    return dispatch(setUserList(modifiedUsersList));
  })
  .catch(err => console.log('problem fetching all users from db in action "fetchAllUsers"', err));
}

export function fetchUsesr(id) {
  return dispatch => axios.get(`/users/${id}`, {
    headers: { Authorization: ` JWT ${localStorage.getItem('auth_token')}` }
  })
  .then((user) => {
    const { data: userObject } = user;
    return dispatch(setCurrentUser(userObject));
  }
  )
  .catch(err => console.log('error getting user info by id from db in action "fetchUser"', err));
}
