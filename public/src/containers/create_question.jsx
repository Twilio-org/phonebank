import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector, destroy } from 'redux-form';
import CreateQuestion from '../components/question/create_question';
import createQuestion from '../actions/admin_questions';
import validate from '../helpers/question_validation';

const FORM_NAME = 'CreateQuestion';

function mapStateToProps(state) {
  const selector = formValueSelector(FORM_NAME);
  return {
    questionType: selector(state, 'type')
  };
}
const CreateQuestionContainer = withRouter(
  reduxForm({
    validate,
    form: FORM_NAME
  })(
    connect(mapStateToProps, { createQuestion, destroy })(CreateQuestion)
  )
);
export default CreateQuestionContainer;
