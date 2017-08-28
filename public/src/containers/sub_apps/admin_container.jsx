import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Admin from '../../components/sub_apps/admin';

import { fetchUser } from '../../actions/account_info';

function mapStateToProps(state) {
  return {
    ...state
  };
}

export default withRouter(
  connect(mapStateToProps,
    { fetchUser }
  )(Admin)
);
