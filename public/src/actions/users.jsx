import axios from 'axios';
import { logoutUser } from './login';
import { SET_USER_ACCOUNT_INFO } from '../reducers/users';

export function setAccountInfo(user) {
  return {
    type: SET_USER_ACCOUNT_INFO,
    payload: user
  };
}

export function registerNewUser(userInfo, history) {
  const { first_name, last_name, email, phone_number, password } = userInfo;
  // route that was previously known as '/users'
  return () => axios.post('/auth/register', {
    first_name,
    last_name,
    password,
    phone_number,
    email
  })
  .then((res) => {
    history.push('/public/login');
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

export function fetchUser(id) {
  return dispatch => axios.get(`/users/${id}`, {
    headers: { Authorization: ` JWT ${localStorage.getItem('auth_token')}` }
  })
  .then((res) => {
    const userData = res.data;
    return dispatch(setAccountInfo(userData));
  })
  .catch((err) => {
    const customError = {
      message: `error fetching user info in account_info action fetchUser: ${err}`,
      name: 'user info post request from account_info component'
    };
    throw customError;
  });
}

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
    history.push(`/volunteers/${userId}`);
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
    const customError = {
      message: `Error with delete user axios request: ${err}`,
      name: 'deleteUser patch request from user actions'
    };
    throw customError;
  });
}

export function addCampaignToUser(id, campaign_id, history) {
  return () => axios.post(`/users/${id}/campaigns`,
    { campaign_id },
    { headers: { Authorization: ` JWT ${localStorage.getItem('auth_token')}` } }
  )
  .then((res) => {
    history.push('/volunteers/campaigns');
    return res;
  })
  .catch((err) => {
    const customError = {
      message: `Error adding campaign to a user: ${err}`,
      name: 'addCampaignToUser function in user actions'
    };
    throw customError;
  });
}
