import axios from 'axios';
import { CLEAR_AUTH, SET_AUTH_JWT_FULFILLED } from '../reducers/login';

export function loginUser(loginInfo, history) {
  const { email, password } = loginInfo;

  return dispatch => axios.post('/authenticate', {
    email,
    password
  })
  .then(res => {
    const { token, id } = res.data;
    localStorage.setItem('auth_token', token);
    dispatch(setUserAuthCredentials({id: id}))
    history.push('/');
  })
  .catch(err => {
    console.log('error in posting user login: ', err);
  })
}

export function logoutUser(userInfo, history) {
  return dispatch => axios.get('/logout')
  .then(() => {
    window.localStorage.removeItem('auth_token');
    history.push('/login');
  })
  .catch(err => {
    console.log('error with user logout: ', err);
  })
}

export function userValidation(cb){
  return dispatch => axios.get('/session', 
  {
    headers: {'Authoization': 'JWT' + localStorage.getItem('auth_token')}
  })
  .then(res => {
    const { id } = res.data;
    return dispatch(setUserAuthCredentials({id: id}));
  })
  .then(() => {
    cb();
  })
  .catch(err => {
    console.log('error with user validation: ', err);
    cb();
  });
}

export function setUserAuthCredentials(user) {
  return {
    type: SET_AUTH_JWT_FULFILLED,
    payload: user
  }
}

export function clearAuthCredentials(){
  return {
    type: CLEAR_AUTH
  }
}

//helper:
export function authTransition(route, isTrue, nextState, replace, callback) {
  console.log('authTransition is running!')
  var authorize = (route, isTrue, nextState, replace, callback) => {
    const currentState = store.getState();
    const currentUser = currentState.authStatus;
    if (!!currentUser.id === isTrue) {
      replace(route);
    }
    callback();
  };
  //validateUser
  store.dispatch(userValidation(authorize.bind(null, route, isTrue, nextState, replace, callback)));
}
