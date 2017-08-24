import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, destroy } from 'redux-form';
import CreateContactList from '../components/contact_list/create_contact_list';
import { createContactList } from '../actions/admin_contact_lists';
import validate from '../helpers/contactList_validation';

const FORM_NAME = 'CreateContactList';

const CreateContactListContainer = withRouter(
  reduxForm({
    validate,
    form: FORM_NAME
  })(
    connect(null, { createContactList, destroy })(CreateContactList)
  )
);
export default CreateContactListContainer;
