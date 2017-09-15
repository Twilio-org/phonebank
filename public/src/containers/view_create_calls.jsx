import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, change, getFormSyncErrors } from 'redux-form';
import CallPage from '../components/calls/calls_page_parent';
import { setCampaignCurrent } from '../actions/campaign';
import validateCall from '../helpers/call_response_validation';
import { setScriptCurrent, setScriptQuestions, fetchScript, fetchScriptQuestions } from '../actions/admin_scripts';
import { assignToCall,
         updateCallOutcome,
         updateCallStatus,
         getCallContactInfo,
         updateCallAttempt,
         releaseCall,
         clearVolunteerActive,
         endTwilioCon,
         clearCurrentCall,
         submitCallResponses } from '../actions/calls';

const FORM = 'CallResponse';
function mapStateToProps(state) {
  return {
    user_id: state.auth.id,
    current_campaign: state.admin_campaigns.current_campaign,
    has_user_joined_campaign: state.admin_campaigns.has_user_joined_campaign,
    current_script: state.admin_scripts.current_script,
    script_questions: state.admin_scripts.script_questions,
    current_call: state.calls.current_call,
    call_id: state.calls.call_id,
    status: state.calls.status,
    outcome: state.calls.outcome,
    contact_id: state.calls.contact_id,
    current_call_contact_name: state.calls.current_call_contact_name,
    form_errors: getFormSyncErrors(FORM)(state)
  };
}

export default withRouter(
  reduxForm({
    form: FORM,
    validate: validateCall
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
          getCallContactInfo,
          updateCallAttempt,
          releaseCall,
          clearVolunteerActive,
          endTwilioCon,
          change,
          submitCallResponses,
          clearCurrentCall
        }
      )(CallPage)
    )
);
