import React, { Component } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

export default class PreCallButtonGroup extends Component {
  constructor(props) {
    super(props);
    const handlers = ['handleStartCallingClick', 'handleStopCallingClick', 'handleSkipClick', 'handleBadNameClick'];
    handlers.forEach((handler) => {
      this[handler] = this[handler].bind(this);
    });
  }

  handleStartCallingClick() {
    const { updateCallStatus } = this.props;
    updateCallStatus('IN_PROGRESS');
  }

  handleSkipClick() {
    const { call_id } = this.props;
    console.log('skip requested');
  }

  handleBadNameClick() {
    const { call_id } = this.props;
    // send update for bad number(marking call as assigned)
    // will also need to assign a new call
    // EP: '/users/:id/campaigns/:campaign_id/calls/:call_id'
    console.log('bad name request');
  }

  handleStopCallingClick() {
    const { history } = this.props;
    // TODO: logic for unassigning call if current call is assigned
    console.log('should also unassign call from user');
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
            <Button onClick={this.handleSkipClick} bsStyle="warning">Skip this person</Button>
            <Button bsStyle="danger">Bad Name</Button>
            <Button onClick={this.handleStopCallingClick} bsStyle="info">Stop Calling</Button>
          </ButtonGroup>
        </div>
      </div>
    );
  }
}
