import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Volunteers from '../../components/sub_apps/volunteers';

import { fetchUser } from '../../actions/users';

function mapStateToProps(state) {
  return {
    ...state
  };
}

export default withRouter(
  connect(mapStateToProps,
    { fetchUser }
  )(Volunteers)
);
