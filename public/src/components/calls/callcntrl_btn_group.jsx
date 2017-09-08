import React from 'react';
import { Button } from 'react-bootstrap';

const CallControl = (props) => {
  const { handler, text, outcome, status, htmlID } = props;
  const style = text === 'Hang Up' ? 'danger' : 'success';
  const disableStatus = text === 'Hang Up' ? (outcome === 'PENDING' || status !== 'IN_PROGRESS') : (outcome === 'PENDING' && status !== 'HUNG_UP');

  return (
    <div id={htmlID}>
      <Button
        disabled={disableStatus}
        onClick={handler}
        bsSize="small"
        bsStyle={style}
      >
        {text === 'Hang Up' ? (<i className="material-icons md-16">call end</i>) : (<i className="material-icons md-18">skip_next</i>) }{text}
      </Button>
    </div>
  );
};

CallControl.displayName = 'CallControl';
export default CallControl;
