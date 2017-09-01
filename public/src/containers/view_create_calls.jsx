import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import CallPage from '../components/calls/calls_page_parent';

import { setCampaignCurrent } from '../actions/campaign';
import { setScriptCurrent, setScriptQuestions } from '../actions/admin_scripts';
import { assignToCall, updateCallOutcome, updateCallStatus } from '../actions/calls';

function mapStateToProps(state) {
  return {
    user_id: state.auth.id,
    current_campaign: state.admin_campaigns.current_campaign,
    has_user_joined_campaign: state.admin_campaigns.has_user_joined_campaign,
    current_script: state.admin_scripts.current_script,
    script_questions: state.admin_scripts.script_questions,
    current_call: state.calls.current_call,
    current_call_status: state.calls.current_call.status,
    current_call_outcome: state.calls.current_call.outcome,
    next_call: state.calls.next_call,
    calls_made: state.calls.calls_made
  };
}

export default withRouter(
  reduxForm({
    form: 'CallResponse'
  })(
      connect(mapStateToProps,
        { setScriptCurrent,
          setScriptQuestions,
          setCampaignCurrent,
          assignToCall,
          updateCallOutcome,
          updateCallStatus
        }
      )(CallPage)
    )
);
