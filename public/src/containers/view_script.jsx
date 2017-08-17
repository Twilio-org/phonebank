import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchScript, fetchScriptQuestions } from '../actions/script';
import ScriptPage from '../components/script/script';


function mapStateToProps(state) {
  return {
    // current_script: state.admin_scripts.current_script,
    script_id: state.script_id,
    script_info: state.script,
    questions: state.script_questions.questions
  };
}

export default withRouter(
  connect(mapStateToProps, { fetchScript, fetchScriptQuestions })(ScriptPage)
);
