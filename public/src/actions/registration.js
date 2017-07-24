import axios from 'axios';

export function registerNewUser(userInfo){
  const { first_name, last_name, email, phone_number, password } = userInfo;
  //route that was previously known as '/users'
  return dispatch => axios.post('/registration', {
    first_name,
    last_name,
    password,
    phone_number,
    email
  })
  .then(res => {
    console.log('response from attempt to post user to db: ', res)
  })
  .catch(err => {
    console.log('error in posting new user to db: ', err);
  })
}