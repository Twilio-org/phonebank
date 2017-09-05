import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

const CallControl = (props) => {
  // this needs to have 
  const { handleNext, handleStop } = props;
  return (
    <div>
      <ButtonGroup>
        <Button onClick={handleNext} bsSize="small" bsStyle="success">Next Call</Button>
        <Button onClick={handleStop} bsSize="small" bsStyle="danger">Stop Calling</Button>
      </ButtonGroup>
    </div>
  );
};

CallControl.dsiplayName = 'CallControl';
export default CallControl;
