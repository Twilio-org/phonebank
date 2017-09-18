import React from 'react';
import { Button, HelpBlock } from 'react-bootstrap';

const CallControl = (props) => {
  const { handler, text, outcome, status, htmlID, invalid } = props;
  const style = text === 'Hang Up' ? 'danger' : 'success';
  const disableStatus = (text === 'Hang Up') ? (status !== 'IN_PROGRESS') : (outcome === 'PENDING' || (outcome === 'ANSWERED' && status !== 'HUNG_UP') || invalid);

  return (
    <div id={htmlID}>
      { invalid && <HelpBlock>Complete survey responses before submit</HelpBlock> }
      { text !== 'Hang Up' && !invalid && status !== 'HUNG_UP' && <HelpBlock> Hang up call before submit</HelpBlock> }
      <Button
        disabled={disableStatus}
        onClick={handler}
        bsStyle={style}
      >
        {text === 'Hang Up' ? (<i className="material-icons md-16">call end</i>) : (<i className="material-icons md-18">skip_next</i>) }
        {(text === 'Hang Up' && status === 'HUNG_UP') ? 'Call Ended' : text}
      </Button>
    </div>
  );
};

CallControl.displayName = 'CallControl';
export default CallControl;
