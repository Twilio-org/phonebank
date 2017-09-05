import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

const CallControl = (props) => {
  // TODO: SUBMIT DOES NOTHING RN... NOTHING
  const { handleHangUp, submitHandler, outcome, call_active } = props;
  return (
    <div>
      <ButtonGroup>
        <Button
          disabled={outcome === 'PENDING' || !call_active}
          onClick={handleHangUp}
          bsSize="small"
          bsStyle="danger"
        >
          Hang Up
        </Button>
        <Button
          disabled={outcome === 'PENDING'}
          onClick={submitHandler}
          bsSize="small"
          bsStyle="success"
        >
          Submit and Next Call
        </Button>
      </ButtonGroup>
    </div>
  );
};

CallControl.dsiplayName = 'CallControl';
export default CallControl;
