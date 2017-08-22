export default {
  view_edit(props) {
    const { page, handleClick, item, history } = props;
    // const { page, history, handleClick, item } = props;
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
          // console.log('path in handler: ', `/admin/${page.toLowerCase()}s/${id}`);
          // uncomment when we have allie's code:
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
  }
};
