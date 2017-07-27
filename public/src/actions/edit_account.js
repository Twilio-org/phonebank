import axios from 'axios';

export default function updateUser(userId, userInfo, history) {
  const { first_name, last_name, email, phone_number } = userInfo;

  return dispatch => axios.put(`/users/${userId}`,
    {
      first_name,
      last_name,
      phone_number,
      email
    },
    { headers: { 'Authorization': ` JWT ${localStorage.getItem('auth_token')}` } }
  )
  .then((res) => {
    history.push(`/account/${userId}`);
  })
  .catch((err) => {
    const customError = {
      message: `error in posting updated user info to db: ${err}`,
      name: 'user info put request from edit_account component'
    };
    throw customError;
  });
}
