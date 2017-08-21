import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ContactLists from '../components/contactlist/contactlist';

import { fetchAllContactLists, setCurrentContactList } from '../actions/admin_contact_lists';

function mapStateToProps(state) {
  return {
    current_contact_list: state.admin_contact_lists.current_contact_list,
    all_contact_lists: state.admin_contact_lists.contact_lists,
    account_info: state.account_info,
    auth: state.auth
  };
}

export default withRouter(
  connect(mapStateToProps, { fetchAllContactLists, setCurrentContactList })(ContactLists)
);
