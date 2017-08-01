import axios from 'axios';

export default function registerNewUser(userInfo, history) {
  const { first_name, last_name, email, phone_number, password } = userInfo;
  // route that was previously known as '/users'
  return dispatch => axios.post('/auth/register', {
    first_name,
    last_name,
    password,
    phone_number,
    email
  })
  .then((res) => {
    history.push('/login');
    return res;
  })
  .catch((err) => {
    const customError = {
      message: `error in posting new user to db: ${err}`,
      name: 'registerNewUser function error in registration.js'
    };
    throw customError;
  });
}
