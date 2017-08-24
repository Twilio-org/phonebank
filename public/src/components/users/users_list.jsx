import React, { Component } from 'react';

import buttons_obj from '../common/admin_button_objs';
import TableListView from '../common/admin_list_view';
import tableHeaders from '../common/list_table_headers';

const { users: userHeaders } = tableHeaders;

export default class UsersList extends Component {
  componentDidMount() {
    this.props.fetchAllUsers();
  }

  render() {
    const { all_users, account_info, history, setCurrentUser } = this.props;
    const thisPage = 'User';
    const { user_management } = buttons_obj;
    const { redirect_path } = userHeaders;

    return (
      <div>
        {
          all_users ? (
            <TableListView
              item_collection={all_users}
              account_info={account_info}
              history={history}
              button_collection={user_management}
              setCurrentItem={setCurrentUser}
              thisPage={thisPage}
              tableHeaders={userHeaders}
              newPath={redirect_path}
            />
        ) : null
      }
      </div>
    );
  }
}

