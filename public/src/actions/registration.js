import axios from 'axios';

export function registerNewUser(userInfo, history) {
  const { first_name, last_name, email, phone_number, password } = userInfo;
  //route that was previously known as '/users'
  return dispatch => axios.post('/register', {
    first_name,
    last_name,
    password,
    phone_number,
    email
  })
  .then(res => {
    console.log('response from attempt to post user to db: ', res);
    history.push('/login');
  })
  .catch(err => {
    console.log('error in posting new user to db: ', err);
  })
}
