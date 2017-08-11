import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';
import QuestionNewForm from '../components/question_new_form';
import createQuestion from '../actions/questions';

const FORM_NAME = 'QuestionNew';

function mapStateToProps(state) {
  const selector = formValueSelector(FORM_NAME);
  return {
    questionType: selector(state, 'type')
  };
}

function validate(values) {
  const errors = {};
  if (!values.title) {
    errors.title = 'Please enter a question title.';
  }
  if (!values.description) {
    errors.description = 'Please enter a question description.';
  }
  if (values.type === 'select') {
    errors.type = 'Please select a question type.';
  }
  return errors;
}
const QuestionNewFormContainer = withRouter(
  reduxForm({
    validate,
    form: FORM_NAME
  })(
    connect(mapStateToProps, { createQuestion })(QuestionNewForm)
  )
);
export default QuestionNewFormContainer;
