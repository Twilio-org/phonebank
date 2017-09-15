function statusToggleActivePause(status) {
  if (status === 'draft' || status === 'pause') {
    return ['Activate', 'active', 'success', false];
  } else if (status === 'active') {
    return ['Pause', 'pause', 'warning', false];
  }
  return ['Activate', null, 'success', true];
}

function statusToggleComplete(status) {
  if (status === 'active' || status === 'pause') {
    return ['End', 'completed', 'danger', false];
  }
  return ['End', 'completed', 'danger', true];
}

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
    const { handleClick, item: { id, status } } = props;
    const statusToggleActivePauseResult = statusToggleActivePause(status);
    const statusToggleCompleteResult = statusToggleComplete(status);
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
        text: () => 'Call Report',
        size: 'xsmall',
        style: 'success',
        handler: () => {}
      },
      {
        key: 3,
        text: () => 'Release Calls',
        size: 'xsmall',
        style: 'default',
        hanlder: () => {}
      },
      {
        key: 4,
        text: () => 'Edit',
        size: 'xsmall',
        style: 'info',
        handler: () => {
          // const { id } = item;
          // props.handleClick(item);
          // history.push(`/admin/${page.toLowerCase()}s/${id}/edit`);
        }
      },
      {
        key: 5,
        text: () => statusToggleActivePauseResult[0],
        size: 'xsmall',
        style: statusToggleActivePauseResult[2],
        handler: () => { handleClick(id, statusToggleActivePauseResult[1]); },
        disabled: statusToggleActivePauseResult[3]
      },
      {
        key: 6,
        text: () => statusToggleCompleteResult[0],
        size: 'xsmall',
        style: statusToggleCompleteResult[2],
        handler: () => { handleClick(id, statusToggleCompleteResult[1]); },
        disabled: statusToggleCompleteResult[3]

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
