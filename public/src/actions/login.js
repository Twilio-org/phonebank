import axios from 'axios';

export function loginUser(loginInfo, history) {
  const { email, password } = loginInfo;

  return dispatch => axios.post('/authenticate', {
    email,
    password
  })
  .then(res => {
    console.log('response from attempt to login user: ', res);
    history.push('/');
  })
  .catch(err => {
    console.log('error in posting user login: ', err);
  })
}
