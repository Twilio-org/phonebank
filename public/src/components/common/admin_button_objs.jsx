export default {
  view_edit(props) {
    const { page, handleClick, item, history } = props;
    const { id } = item;
    return [
      {
        key: 1,
        text: 'View',
        size: 'xsmall',
        style: 'primary',
        handler: () => {
          // TO-DO: uncomment once responses data is decided for questions reducer
          // handleClick(item);
          history.push(`/admin/${page.toLowerCase()}s/${id}`);
        }
      },
      {
        key: 2,
        text: 'Edit',
        size: 'xsmall',
        style: 'danger',
        handler: () => {
          handleClick(item);
          console.log('no edit view, yet');
          // history.push(`/admin/${page.toLowerCase()}s/${item.id}/edit`);
        }
      }
    ];
  },
  campaigns(props, item) {
    return [
      {
        key: 1,
        text: 'Call Page',
        size: 'xsmall',
        style: 'primary',
        handler: () => {}
      },
      {
        key: 2,
        text: 'Call Report',
        size: 'xsmall',
        style: 'success',
        handler: () => {}
      },
      {
        key: 3,
        text: 'Release Calls',
        size: 'xsmall',
        style: 'warning',
        hanlder: () => {}
      },
      {
        key: 4,
        text: 'Edit',
        size: 'xsmall',
        style: 'danger',
        handler: () => {
          // const { id } = item;
          props.handleClick(item);
          // history.push(`/admin/${page.toLowerCase()}s/${id}/edit`);
        }
      }
    ];
  },
  user_management(props) {
    const { page, handleClick, item, history } = props;
    const { id, is_admin, is_banned, is_active, first_name } = item;
    return [
      {
        key: 1,
        name: 'adminPriv',
        text: () => {
          console.log(typeof is_admin, first_name, '$$$$$$$$$$')
          return JSON.parse(is_admin.toLowerCase()) ? 'Demote' : 'Promote';
          // ['Promote', 'Demote']
        },
        size: 'xsmall',
        style: 'primary',
        handler: () => {
          // TO-DO: uncomment once responses data is decided for questions reducer
          console.log('not yet active');
          handleClick(item);
          // history.push(`/admin/${page.toLowerCase()}s/${id}`);
        }
      },
      {
        key: 2,
        name: 'activeStatus',
        text: () => {
          return JSON.parse(is_active.toLowerCase()) ? 'Deactivate' : 'Activate';
          // ['Activate', 'Deactivate']
        },
        size: 'xsmall',
        style: 'warning',
        handler: () => {
          handleClick(item);
          console.log('no edit view, yet');
          // history.push(`/admin/${page.toLowerCase()}s/${item.id}/edit`);
        }
      },
      {
        key: 3,
        name: 'ban',
        text: () => {
          return JSON.parse(is_banned.toLowerCase()) ? 'Reinstate' : 'Ban';
          // ['Ban', 'Reinstate']
        },
        size: 'xsmall',
        style: 'danger',
        handler: () => {
          console.log('not yet active');
          handleClick(item);
        }
      }
    ];
  }
};
