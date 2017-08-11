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

const QuestionNewFormContainer = withRouter(
  reduxForm({
    form: FORM_NAME
  })(
    connect(mapStateToProps, { createQuestion })(QuestionNewForm)
  )
);
export default QuestionNewFormContainer;
