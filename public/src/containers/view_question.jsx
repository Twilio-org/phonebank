import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ViewQuestion from '../components/question/view_question';
import { fetchQuestion } from '../actions/questions';

function mapStateToProps(state) {
  return {
    question_info: state.question_info
  };
}
const ViewQuestionContainer = withRouter(
    connect(mapStateToProps, { fetchQuestion })(ViewQuestion)
);
export default ViewQuestionContainer;
