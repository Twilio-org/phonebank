import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ScriptForm from '../components/script_form';
import { fetchAllQuestions } from '../actions/script_form';

function mapStateToProps() {
  return { questions: state.questions }
}

export default withRouter(
  reduxForm({
    form: 'ScriptForm'
  })(
    connect(mapStateToProps, { fetchAllQuestions })(ScriptForm)
  )
);
