import axios from 'axios';

function updateUser(userInfo, history) {
  const { first_name, last_name, email, phone_number } = userInfo;

  return dispatch => axios.put('/users', {
    first_name,
    last_name,
    phone_number,
    email
  })
  .then((res) => {
    console.log('response from attempt to post user update to db: ', res);
    history.push('/account');
  })
  .catch((err) => {
    console.log('error in posting updated user info to db: ', err);
  });
}

export default updateUser;
