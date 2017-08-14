import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ScriptsList from '../components/admin_scripts';

import { fetchAllScripts, setCurrentScript } from '../actions/admin_scripts';

function mapStateToProps(state) {
  return {
    current_script: state.admin_scripts.current_script,
    all_scripts: state.admin_scripts.all_scripts,
    account_info: state.account_info,
    auth: state.auth
  };
}

export default withRouter(
  connect(mapStateToProps, { fetchAllScripts, setCurrentScript })(ScriptsList)
);
