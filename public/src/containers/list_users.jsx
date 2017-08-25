import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import UsersList from '../components/users/users_list';

import { fetchAllUsers, setCurrentUsers, adminUpdateUserInfo } from '../actions/admin_users';

function mapStateToProps(state) {
  return {
    current_user: state.admin_users.current_user,
    all_users: state.admin_users.all_users,
    account_info: state.account_info,
    auth: state.auth
  };
}

export default withRouter(
  connect(mapStateToProps, { fetchAllUsers, setCurrentUsers, adminUpdateUserInfo })(UsersList)
);
