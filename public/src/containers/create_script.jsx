import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import ScriptForm from '../components/script/create_script_form';
import { postScript } from '../actions/admin_scripts';
import { fetchAllQuestions } from '../actions/admin_questions';

const FORM_NAME = 'ScriptForm';

function validate(values) {
  const errors = {};
  if (!values.name) {
    errors.name = 'Please enter a name for your script.';
  }
  if (!values.description) {
    errors.description = 'Please enter a description for your script.';
  }
  if (!values.body) {
    errors.body = 'Please enter a body for your script.';
  }
  if (!values.question1) {
    errors.question1 = 'Please select at least one question for your script.';
  }
  return errors;
}

function mapStateToProps(state) {
  return { questionOptions: state.admin_questions.all_questions };
}

// so fetchAllQuestions get into state, so we can call it in componentDidMount
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchAllQuestions, postScript }, dispatch);
}

const ScriptNewFormContainer = withRouter(
  reduxForm({
    validate,
    destroyOnUnmount: false,
    form: FORM_NAME
  })(
    connect(mapStateToProps, mapDispatchToProps)(ScriptForm)
  )
);

export default ScriptNewFormContainer;
