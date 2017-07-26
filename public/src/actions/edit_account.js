import axios from 'axios';

export function updateUser(userId, userInfo, history) {
  const { first_name, last_name, email, phone_number } = userInfo;

  return dispatch => axios.put(`/users/${userId}`,
    {
      first_name,
      last_name,
      phone_number,
      email
    },
    { headers: { 'Authorization': ' JWT ' + localStorage.getItem('auth_token') } }
  )
  .then((res) => {
    console.log('response from attempt to post user update to db: ', res);
    history.push('/account');
  })
  .catch((err) => {
    console.log('error in posting updated user info to db: ', err);
  });
}
