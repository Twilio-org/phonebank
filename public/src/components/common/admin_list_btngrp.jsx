import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

const AdminListBtnGroup = (props) => {
  const { buttons, page } = props;
  return (
    <ButtonGroup vertical>
      {
        buttons.map((button) => {
          const { style, text, handler, size, key } = button;
          if (page === 'User') {
            return (
              <Button
                bsSize={size}
                bsStyle={style}
                key={key}
                onClick={handler}
              >
                {text()}
              </Button>);
          }
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

AdminListBtnGroup.displayName = 'AdminListBtnGroup';

export default AdminListBtnGroup;
