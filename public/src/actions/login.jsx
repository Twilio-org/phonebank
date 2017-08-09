import axios from 'axios';
import { CLEAR_AUTH, SET_AUTH_JWT_FULFILLED, LOGOUT_USER } from '../reducers/login';

export function setUserAuthCredentials(user) {
  return {
    type: SET_AUTH_JWT_FULFILLED,
    payload: user
  };
}

export function clearAuthCredentials() {
  return {
    type: CLEAR_AUTH
  };
}

export function logout() {
  return {
    type: LOGOUT_USER
  };
}

export function loginUser(loginInfo, history) {
  const { email, password } = loginInfo;

  return dispatch => axios.post('/auth/login', {
    email,
    password
  })
  .then((res) => {
    const { token, id } = res.data;
    localStorage.setItem('auth_token', token);
    dispatch(setUserAuthCredentials({ id }));
    history.push('/');
  })
  .catch((err) => {
    const customError = {
      message: `error fetching user info in account_info action fetchUserInfo: ${err}`,
      name: 'user info post request from account_info component'
    };
    throw customError;
  });
}

export function logoutUser(history) {
  console.log(history, '&&&&&&&&&&&');
  return dispatch => axios.get('/logout')
  .then((history) => {
    console.log(history, '%%%%%%%%%%%')
    localStorage.removeItem('auth_token');
    dispatch(logout());
    history.push('/login');
  })
  .catch((err) => {
    const customError = {
      message: `error with user logout: ${err}`,
      name: 'logoutUser function error'
    };
    throw customError;
  });
}

export function authTransition(storeInstance) {
  const { auth } = storeInstance.getState();
  const { id } = auth;
  const token = localStorage.getItem('auth_token');
  return !!id && !!token;
}

export function checkIfAdmin(storeInstance) {
  const storeState = storeInstance.getState();
  console.log('%%%%%%%%%%%', storeState);
  const { account_info } = storeInstance.getState();
  console.log(account_info);
  const { is_admin } = account_info;
  console.log('###########', is_admin)
  return is_admin;
}
