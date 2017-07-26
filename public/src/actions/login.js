import axios from 'axios';
import { CLEAR_AUTH, SET_AUTH_JWT_FULFILLED } from '../reducers/login';

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

export function loginUser(loginInfo, history) {
  const { email, password } = loginInfo;

  return dispatch => axios.post('/authenticate', {
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
  })
}

export function logoutUser(userInfo, history) {
  return dispatch => axios.get('/logout')
  .then(() => {
    localStorage.removeItem('auth_token');
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

// export function userValidation(cb) {
//   return dispatch => axios.get('/session',
//     {
//       headers: {'Authoization': 'JWT' + localStorage.getItem('auth_token')}
//     })
//   .then((res) => {
//     const { id } = res.data;
//     return dispatch(setUserAuthCredentials({ id: id }));
//   })
//   .then(() => {
//     cb();
//   })
//   .catch((err) => {
//     const customError = {
//       message: `error with user validation: ${err}`,
//       name: 'function userValidation'
//     };
//     throw customError;
//     cb();
//   });
// }


export function authTransition(storeInstance) {
  const { auth } = storeInstance.getState();
  const { id } = auth;
  const token = localStorage.getItem('auth_token');
  return !!id && !!token;
}
