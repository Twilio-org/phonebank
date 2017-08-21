import React, { Component } from 'react';

import buttons_obj from '../common/admin_button_objs';
import TableListView from '../common/admin_list_view';
import tableHeaders from '../common/list_table_headers';

const { contact_lists: contactListsHeaders } = tableHeaders;

export default class ContactLists extends Component {
  componentDidMount() {
    this.props.fetchAllContactLists();
  }

  render() {
    const { all_contact_lists, account_info, history, setCurrentContactList } = this.props;
    const thisPage = 'ContactLists';
    const { view_edit } = buttons_obj;

    return (
      <div>
        {
          all_contact_lists ? (
            <TableListView
              item_collection={all_contact_lists}
              account_info={account_info}
              history={history}
              button_collection={view_edit}
              setCurrentItem={setCurrentContactList}
              thisPage={thisPage}
              tableHeaders={contactListsHeaders}
            />
          ) : null
        }
      </div>
    );
  }
}
