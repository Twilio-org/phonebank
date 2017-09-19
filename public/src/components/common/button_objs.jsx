export default {
  view_edit(props) {
    const { page, item, history } = props;
    const { id } = item;
    return [
      {
        key: 1,
        text: () => 'View',
        size: 'xsmall',
        style: 'primary',
        handler: () => {
          // props.handleClick(item);
          history.push(`/admin/${page.toLowerCase()}s/${id}`);
        }
      },
      {
        key: 2,
        text: () => 'Edit',
        size: 'xsmall',
        style: 'danger',
        handler: () => {
          // handleClick(item);
          // history.push(`/admin/${page.toLowerCase()}s/${item.id}/edit`);
        }
      }
    ];
  },
  admin_campaigns(props) { // deleted props and item as arguments because they were causing an error
    const { page, item, history } = props;
    const { id } = item;
    return [
      {
        key: 1,
        text: () => 'Call Page',
        size: 'xsmall',
        style: 'primary',
        handler: () => {}
      },
      {
        key: 2,
        text: () => 'Campaign Stats',
        size: 'xsmall',
        style: 'success',
        handler: () => {
          history.push(`/admin/${page.toLowerCase()}s/${id}`);
        }
      },
      {
        key: 3,
        text: () => 'Release Calls',
        size: 'xsmall',
        style: 'warning',
        hanlder: () => {}
      },
      {
        key: 4,
        text: () => 'Edit',
        size: 'xsmall',
        style: 'danger',
        handler: () => {
          // const { id } = item;
          // props.handleClick(item);
          // history.push(`/admin/${page.toLowerCase()}s/${id}/edit`);
        }
      }
    ];
  },
  user_management(props) {
    const { handleClick, item, currentUser } = props;
    const { id, is_admin, is_banned, is_active } = item;

    return [
      {
        key: 1,
        name: 'adminPriv',
        text: () => (JSON.parse(is_admin.toLowerCase()) ? 'Demote' : 'Promote'),
        size: 'xsmall',
        style: 'primary',
        handler: () => {
          const newValue = !JSON.parse(is_admin.toLowerCase());
          handleClick(id, 'is_admin', newValue, currentUser);
        }
      },
      {
        key: 2,
        name: 'activeStatus',
        text: () => (JSON.parse(is_active.toLowerCase()) ? 'Deactivate' : 'Activate'),
        size: 'xsmall',
        style: 'warning',
        handler: () => {
          const newValue = !JSON.parse(is_active.toLowerCase());
          handleClick(id, 'is_active', newValue, currentUser);
        }
      },
      {
        key: 3,
        name: 'ban',
        text: () => (JSON.parse(is_banned.toLowerCase()) ? 'Unban' : 'Ban'),
        size: 'xsmall',
        style: 'danger',
        handler: () => {
          const newValue = !JSON.parse(is_banned.toLowerCase());
          handleClick(id, 'is_banned', newValue, currentUser);
        }
      }
    ];
  },
  volunteer_campaigns(props) {
    const { item, auth, history, handleClick } = props;
    const { id } = auth;
    return [
      {
        key: 1,
        text: () => 'Join',
        size: 'xsmall',
        style: 'success',
        handler: () => {
          handleClick(id, history, item);
        }
      }
    ];
  }
};
