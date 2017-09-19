import React from 'react';
import { Button } from 'react-bootstrap';

const CallControlButton = (props) => {
  const { handler, text, bsStyle, id, materialIcon, disabled } = props;
  return (
    <Button
      id={id}
      disabled={disabled}
      onClick={handler}
      bsStyle={bsStyle}
    >
      <i className="material-icons md-16">{materialIcon}</i>
      {` ${text}`}
    </Button>
  );
};

export default CallControlButton;
