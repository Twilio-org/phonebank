import React, { Component } from 'react';

import buttons_obj from '../common/button_objs';
import TableListView from '../common/list_view';
import tableHeaders from '../common/list_table_headers';

const { users: userHeaders } = tableHeaders;

export default class UsersList extends Component {
  componentDidMount() {
    const { auth: { id } } = this.props;
    this.props.fetchAllUsers(id);
  }

  render() {
    const { all_users, account_info, history, adminUpdateUserInfo } = this.props;
    const thisPage = 'User';
    const { user_management } = buttons_obj;
    const { redirect_path } = userHeaders;
    const { auth: { id } } = this.props;

    return (
      <div>
        {
          all_users ? (
            <TableListView
              currentUser={id}
              item_collection={all_users}
              account_info={account_info}
              history={history}
              button_collection={user_management}
              setCurrentItem={adminUpdateUserInfo}
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

