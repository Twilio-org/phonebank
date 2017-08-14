import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import QuestionsList from '../components/questions_list';

import { fetchAllQuestions, setCurrentQuestion } from '../actions/admin_questions';

function mapStateToProps(state) {
  return {
    current_question: state.admin_questions.current_question,
    all_questions: state.admin_questions.all_questions,
    account_info: state.account_info,
    auth: state.auth
  };
}

export default withRouter(
  connect(mapStateToProps, { fetchAllQuestions, setCurrentQuestion })(QuestionsList)
);
