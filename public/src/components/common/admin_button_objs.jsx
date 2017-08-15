export default {
  view_edit(props) {
    const { thisPage } = props;
    let target;
    if (thisPage === 'Question') {
      const { question } = props;
      target = question;
    } else if (thisPage === 'Script') {
      const { script } = props;
      target = script;
    }
    return [
      {
        key: 1,
        text: 'View',
        size: 'xsmall',
        style: 'primary',
        handler: () => {
          props.handleEditClick(target);
        }
      },
      {
        key: 2,
        text: 'Edit',
        size: 'xsmall',
        style: 'danger',
        handler: () => {
          props.handleEditClick(target);
        }
      }
    ];
  },
  campaigns(props, target) {
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
          props.handleEditClick(target);
        }
      }
    ];
  }
};
