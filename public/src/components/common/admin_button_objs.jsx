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
    const { id } = item;
    return [
      {
        key: 1,
        text: ['Promote', 'Demote'],
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
        text: ['Deactivate', 'Activate'],
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
        text: ['Deactivate', 'Reinstate'],
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
