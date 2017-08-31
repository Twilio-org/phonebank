import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, destroy } from 'redux-form';

import CallsPage from '../components/calls/calls';

// import { ...actions } from [ wherever ]
import { setCampaignCurrent } from '../actions/campaign';
import { setScriptCurrent, setScriptQuestions } from '../actions/admin_scripts';

function mapStateToProps(state) {
  return {
    current_campaign: state.admin_campaigns.current_campaign,
    // has_user_joined_campaign: state.admin_campaigns.has_user_joined_campaign,
    current_script: state.admin_scripts.current_script,
    script_questions: state.admin_scripts.script_questions
    // current_call: state.calls.current_call
    // add in call active, etc.
  };
}

export default withRouter(
  reduxForm({
    form: 'CallResponse'
  })(
      connect(mapStateToProps,
        { setScriptCurrent,
          setScriptQuestions,
          setCampaignCurrent
        }
      )(CallsPage)
    )
);
