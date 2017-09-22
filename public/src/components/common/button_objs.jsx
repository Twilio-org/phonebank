const statusMap = {
  activateOrPause: {
    isDraftOrPause: {
      label: 'Activate',
      status: 'active',
      buttonStyle: 'success',
      isDisabled: false
    },
    isActive: {
      label: 'Pause',
      status: 'pause',
      buttonStyle: 'warning',
      isDisabled: false
    },
    isOther: {
      label: 'Activate',
      status: null,
      buttonStyle: 'success',
      isDisabled: true
    }
  },
  complete: {
    isActiveOrPause: {
      label: 'End',
      status: 'completed',
      buttonStyle: 'danger',
      isDisabled: false
    },
    isOther: {
      label: 'End',
      status: 'completed',
      buttonStyle: 'danger',
      isDisabled: true
    }
  }
};

function statusToggleActivePause(status) {
  const { activateOrPause } = statusMap;
  if (status === 'draft' || status === 'pause') {
    return activateOrPause.isDraftOrPause;
  } else if (status === 'active') {
    return activateOrPause.isActive;
  }
  return activateOrPause.isOther;
}

function statusToggleComplete(status) {
  const { complete } = statusMap;
  if (status === 'active' || status === 'pause') {
    return complete.isActiveOrPause;
  }
  return complete.isOther;
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
  admin_campaigns(props) {
    const { handleClick, history, page, item: { id, status } } = props;
    const statusToggleActivePauseResult = statusToggleActivePause(status);
    const statusToggleCompleteResult = statusToggleComplete(status);
    return [
      {
        key: 1,
        text: () => 'Call Page',
        size: 'xsmall',
        style: 'success',
        handler: () => {}
      },
      {
        key: 2,
        text: () => 'Release Calls',
        size: 'xsmall',
        style: 'warning',
        hanlder: () => {}
      },
      {
        key: 3,
        text: () => 'View',
        size: 'xsmall',
        style: 'primary',
        handler: () => {
          history.push(`/admin/${page.toLowerCase()}s/${id}/view`);
        }
      },
      {
        key: 4,
        text: () => statusToggleActivePauseResult.label,
        size: 'xsmall',
        style: statusToggleActivePauseResult.buttonStyle,
        handler: () => { handleClick(id, statusToggleActivePauseResult.status); },
        disabled: statusToggleActivePauseResult.isDisabled
      },
      {
        key: 5,
        text: () => statusToggleCompleteResult.label,
        size: 'xsmall',
        style: statusToggleCompleteResult.buttonStyle,
        handler: () => { handleClick(id, statusToggleCompleteResult.status); },
        disabled: statusToggleCompleteResult.isDisabled

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
