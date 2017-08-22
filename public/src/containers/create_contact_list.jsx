import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, destroy } from 'redux-form';
import CreateContactList from '../components/contact_list/create_contact_list';
import validate from '../helpers/question_validation';

const FORM_NAME = 'CreateContactList';

// function mapStateToProps(state) {
//   const selector = formValueSelector(FORM_NAME);
//   return {
//     questionType: selector(state, 'type')
//   };
// }
const CreateContactListContainer = withRouter(
  reduxForm({
    validate,
    form: FORM_NAME
  })(
    connect(null, { destroy })(CreateContactList)
  )
);
export default CreateContactListContainer;
