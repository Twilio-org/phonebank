import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import CallPage from '../components/calls/calls_page_parent';

import { setCampaignCurrent } from '../actions/campaign';

import { setScriptCurrent, setScriptQuestions, fetchScript, fetchScriptQuestions } from '../actions/admin_scripts';
import { assignToCall, updateCallOutcome, updateCallStatus, getCallContactInfo } from '../actions/calls';

function mapStateToProps(state) {
  return {
    user_id: state.auth.id,
    current_campaign: state.admin_campaigns.current_campaign,
    has_user_joined_campaign: state.admin_campaigns.has_user_joined_campaign,
    current_script: state.admin_scripts.current_script,
    script_questions: state.admin_scripts.script_questions,
    current_call: state.calls.current_call,
    calls_made: state.calls.calls_made,
    status: state.calls.status,
    outcome: state.calls.outcome,
    contact_id: state.calls.contact_id,
    contact_name: state.calls.contact_name,
    contact_number: state.calls.contact_number
  };
}

export default withRouter(
  reduxForm({
    form: 'CallResponse'
  })(
      connect(mapStateToProps,
        { setScriptCurrent,
          setScriptQuestions,
          fetchScript,
          fetchScriptQuestions,
          setCampaignCurrent,
          assignToCall,
          updateCallOutcome,
          updateCallStatus,
          getCallContactInfo
        }
      )(CallPage)
    )
);
