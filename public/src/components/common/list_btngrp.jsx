import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

const ListBtnGroup = (props) => {
  const { buttons } = props;
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

ListBtnGroup.displayName = 'ListBtnGroup';

export default ListBtnGroup;
