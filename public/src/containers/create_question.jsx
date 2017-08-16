import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';
import CreateQuestion from '../components/question/create_question';
import createQuestion from '../actions/questions';
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
    connect(mapStateToProps, { createQuestion })(CreateQuestion)
  )
);
export default CreateQuestionContainer;
