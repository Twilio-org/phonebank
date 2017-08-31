import React, { Component } from 'react';

import buttons_obj from '../common/button_objs';
import TableListView from '../common/list_view';
import tableHeaders from '../common/list_table_headers';

const { contact_lists: contactListsHeaders } = tableHeaders;

export default class ContactLists extends Component {
  componentDidMount() {
    this.props.fetchAllContactLists();
  }

  render() {
    const { all_contact_lists, account_info, history } = this.props;
    const thisPage = 'Contact List';
    const { view_edit } = buttons_obj;
    const { redirect_path } = contactListsHeaders;

    return (
      <div>
        {
          all_contact_lists ? (
            <TableListView
              item_collection={all_contact_lists}
              account_info={account_info}
              history={history}
              button_collection={view_edit}
              componentClickHandler={() => {}}
              thisPage={thisPage}
              tableHeaders={contactListsHeaders}
              newPath={redirect_path}
            />
          ) : null
        }
      </div>
    );
  }
}
