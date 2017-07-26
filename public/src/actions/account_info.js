import axios from 'axios';
import { SET_USER_ACCOUNT_INFO } from '../reducers/account_info';

export function setAccountInfo(user) {
  return {
    type: SET_USER_ACCOUNT_INFO,
    payload: user
  };
}

export function fetchUser(id) {
  return dispatch => axios.get(`/users/${id}`, {
    headers: { 'Authorization': ` JWT ${localStorage.getItem('auth_token')}` }
  })
  .then((res) => {
    const userData = res.data;
    return dispatch(setAccountInfo(userData));
  })
  .catch((err) => {
    const customError = {
      message: `error fetching user info in account_info action fetchUserInfo: ${err}`,
      name: 'user info post request from account_info component'
    };
    throw customError;
  });
}
