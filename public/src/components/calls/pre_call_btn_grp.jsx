import React, { Component } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

export default class PreCallButtonGroup extends Component {
  constructor(props) {
    super(props);
    this.handleStartCallingClick = this.handleStartCallingClick.bind(this);
    this.handleStopCallingClick = this.handleStopCallingClick.bind(this);
    this.handleSkipClick = this.handleSkipClick.bind(this);
  }

  handleStartCallingClick() {
    const { updateCallStatus } = this.props;
    updateCallStatus('IN_PROGRESS');
  }

  handleSkipClick() {
    // send update for bad number(marking call as assigned)
    // will also need to assign a new call
  }

  handleStopCallingClick() {
    const { history } = this.props;
    // TODO: logic for unassigning call if current call is assigned
    history.push('/volunteers/campaigns');
  }

  render() {
    const { contact_name } = this.props;
    return (
      <div>
        <h5>Now Calling:</h5>
        <h3>{contact_name}</h3>

        <Button
          onClick={this.handleStartCallingClick}
          bsStyle="success"
        >
          Start Call
        </Button>

        <div>
          <ButtonGroup vertical id="pre_call_side">
            <Button onClick={} bsStyle="warning">Skip this person</Button>
            <Button bsStyle="danger">Bad Name</Button>
            <Button onClick={this.handleStopCallingClick} bsStyle="info">Stop Calling</Button>
          </ButtonGroup>
        </div>
      </div>
    );
  }
}
