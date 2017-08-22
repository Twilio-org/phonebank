import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ViewQuestion from '../components/question/view_question';
import { fetchQuestion } from '../actions/admin_questions';

function mapStateToProps(state) {
  return {
    current_question: state.admin_questions.current_question
  };
}
const ViewQuestionContainer = withRouter(
    connect(mapStateToProps, { fetchQuestion })(ViewQuestion)
);
export default ViewQuestionContainer;
