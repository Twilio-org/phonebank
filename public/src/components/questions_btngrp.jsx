import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

const QuestionsButtonGroup = (props) => {
  const buttons = [
    {
      key: 1,
      text: 'View',
      size: 'xsmall',
      style: 'primary',
      handler: () => {
        const { question } = props;
        props.handleEditClick(question);
      }
    },
    {
      key: 2,
      text: 'Edit',
      size: 'xsmall',
      style: 'danger',
      handler: () => {
        const { question } = props;
        props.handleEditClick(question);
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

QuestionsButtonGroup.displayName = 'QuestionsButtonGroup';

export default QuestionsButtonGroup;
