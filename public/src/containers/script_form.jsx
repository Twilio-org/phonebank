import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import ScriptForm from '../components/script_form';
import { fetchAllQuestions, postScript } from '../actions/script_form';

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
  return { questionOptions: state.script_form.questionOptions };
}

// so fetchAllQuestions get into state, so we can call it in componentDidMount
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchAllQuestions, postScript }, dispatch);
}

const ScriptNewFormContainer = withRouter(
  reduxForm({
    validate,
    form: FORM_NAME
  })(
    connect(mapStateToProps, mapDispatchToProps)(ScriptForm)
  )
);

export default ScriptNewFormContainer;
