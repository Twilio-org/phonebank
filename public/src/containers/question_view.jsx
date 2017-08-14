import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import QuestionView from '../components/question_view';
import fetchQuestion from '../actions/questions';

function mapStateToProps(state) {
  return {
    question_info: state.question_info
  };
}
const QuestionViewContainer = withRouter(
    connect(mapStateToProps, { fetchQuestion })(QuestionView)
);
export default QuestionViewContainer;
