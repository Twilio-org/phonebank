import axios from 'axios';
import { SET_USER_ACCOUNT_INFO } from '../reducers/account_info';

export function fetchUser(id){
  console.log(id, 'id in fetch user')
  //refactor to use backticks
  return dispatch => axios.get(`/users/${id}`, {
    headers: {'Authorization': ' JWT ' + localStorage.getItem('auth_token')}
  })
  .then(res => {
    const userData = res.data;
    return dispatch(setAccountInfo(userData));
  })
  .catch(err => {
    console.log('error fetching user info in account_info action fetchUserInfo: ', err);
  })
}

export function setAccountInfo(user){
  return {
    type: SET_USER_ACCOUNT_INFO,
    payload: user
  }
}
