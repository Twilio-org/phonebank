import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

const CampaignButtonGroup = (props) => {
  const buttons = [
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
      text: 'Edit Campaign',
      size: 'xsmall',
      style: 'danger',
      handler: () => {
        const { campaign } = props;
        props.handleEditClick(campaign);
      }
    }
  ];
  return (
    <ButtonGroup vertical>
      {
        buttons.map((button) => {
          const { style, text, handler, size, key } = button;
          return (
            <Button
              bsSize={size}
              bsStyle={style}
              key={key}
              onClick={handler}
            >
              {text}
            </Button>);
        })
      }
    </ButtonGroup>
  );
};

CampaignButtonGroup.displayName = 'CampaignButtonGroup';

export default CampaignButtonGroup;
