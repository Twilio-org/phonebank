import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

const CallControl = (props) => {
  // TODO: SUBMIT DOES NOTHING RN... NOTHING
  const { handleHangUp, submitHandler, outcome, call_current_active, status } = props;
  return (
    <div>
      <ButtonGroup>
        <Button
          disabled={outcome === 'PENDING' && !call_current_active}
          onClick={handleHangUp}
          bsSize="small"
          bsStyle="danger"
        >
          Hang Up
        </Button>
        <Button
          disabled={outcome === 'PENDING' && status !== 'HUNG_UP'}
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

CallControl.displayName = 'CallControl';
export default CallControl;
