import axios from 'axios';

export function fetchUser(id) {
  return dispatch => axios.get(`/user/${id}`)
    headers: {'Authorization': ` JWT ${localStorage.getItem('auth_token')}`}
.then((res) => {
  const userData = res.data;
  return dispatch(setAccountInfo(userData));
  console.log('response from attempt to get account info from db: ', res);
})
.catch((err) => {
  console.log('error in getting account info from db: ', err);
});
}

export default fetchUser;
