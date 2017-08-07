import axios from 'axios';
import { logoutUser } from './login';

export function updateUser(userId, userInfo, history) {
  const { first_name, last_name, email, phone_number } = userInfo;

  return () => axios.put(`/users/${userId}`,
    {
      first_name,
      last_name,
      phone_number,
      email
    },
    { headers: { Authorization: ` JWT ${localStorage.getItem('auth_token')}` } }
  )
  .then(() => {
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

export function deleteUser(id, history) {
  return dispatch => axios.patch(`/users/${id}`,
  { id },
  { headers: { Authorization: ` JWT ${localStorage.getItem('auth_token')}` } }
  )
  .then(() => dispatch(logoutUser(history)))
  .catch((err) => {
    console.log('error with delete user axios request: ', err);
  });
}
