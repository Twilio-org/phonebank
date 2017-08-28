import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Public from '../../components/sub_apps/public';

export default withRouter(
  connect(null,
    {}
  )(Public)
);
