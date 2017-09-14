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
    const { call_id, user_id, campaign_id, updateAttempt } = this.props;
    const params = { user_id, campaign_id, call_id, status: 'IN_PROGRESS' };
    updateAttempt(params);
  }

  handleSkipClick() {
    const {
      call_id,
      user_id,
      campaign_id,
      status,
      releaseCall,
      clearCurrentCall,
      nextCall } = this.props;
    clearCurrentCall();
    nextCall(user_id, campaign_id);
    releaseCall(user_id, campaign_id, call_id, status);
  }

  handleBadNameClick() {
    const { call_id, user_id, campaign_id, updateAttempt } = this.props;
    const params = { user_id, campaign_id, call_id, status: 'ATTEMPTED', outcome: 'BAD_NUMBER' };
    updateAttempt(params);
  }

  handleStopCallingClick() {
    const { history,
            call_id,
            user_id,
            campaign_id,
            releaseCall,
            status,
            endVolunterTwilioCon,
            clearCurrentCall } = this.props;
    clearCurrentCall();
    releaseCall(user_id, campaign_id, call_id, status);
    endVolunterTwilioCon(user_id, campaign_id);
    history.push('/volunteers/campaigns');
  }

  render() {
    const { current_call_contact_name } = this.props;
    return (
      <div>
        <h5>Now Calling:</h5>
        <h3>{current_call_contact_name}</h3>

        <Button
          onClick={this.handleStartCallingClick}
          bsStyle="success"
        >
          <i className="material-icons small">phone_in_talk</i> Start Call
        </Button>

        <div>
          <ButtonGroup vertical id="pre_call_side">
            <Button onClick={this.handleSkipClick} bsStyle="warning">
              <i className="material-icons md-16">skip_next</i>
              Skip this person
            </Button>
            <Button onClick={this.handleBadNameClick} bsStyle="danger">
              <i className="material-icons md-16">block</i>
              Bad Name
            </Button>
            <Button onClick={this.handleStopCallingClick} bsStyle="info">
              <i className="material-icons md-16">stop</i>
              Stop Calling
            </Button>
          </ButtonGroup>
        </div>
      </div>
    );
  }
}
