import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Users from '../../components/sub_apps/users';

import { fetchUser } from '../../actions/account_info';

function mapStateToProps(state) {
  return {
    ...state
  };
}

export default withRouter(
  connect(mapStateToProps,
    { fetchUser }
  )(Users)
);
