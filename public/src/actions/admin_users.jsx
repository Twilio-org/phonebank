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

// export function fetchAllUsers() {
//   return dispatch => axios.get('/users', {
//     headers: { Authorization: ` JWT ${localStorage.getItem('auth_token')}` }
//   })
//   .then((users) => {
//     const { data: usersList } = users;
//     return dispatch(setUserList(usersList));
//   })
//   .catch(err => console.log('problem fetching all users from db in action "fetchAllUsers"', err));
// }

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


const users = [
  {
    first_name: 'andi',
    last_name: 'oneto',
    email: 'meow@aol.com',
    phone_number: '1231231233',
    is_admin: 'false',
    is_banned: 'false',
    is_active: 'true',
    created_at: 'meow'
  },
  {
    first_name: 'jdjfdsh',
    last_name: 'onetdfso',
    email: 'meow@aol.com',
    phone_number: '1231231233',
    is_admin: 'false',
    is_banned: 'false',
    is_active: 'true',
    created_at: 'meow'
  },
  {
    first_name: 'ddddddd',
    last_name: 'ffffff',
    email: 'meow@aol.com',
    phone_number: '1231231233',
    is_admin: 'false',
    is_banned: 'false',
    is_active: 'true',
    created_at: 'meow'
  }
];


export function fetchAllUsers() {
  return dispatch => dispatch(setUserList(users));
}
