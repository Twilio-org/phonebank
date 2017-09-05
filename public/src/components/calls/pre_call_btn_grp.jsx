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
    const { call_id, user_id, campaign_id, releaseCall, nextCall } = this.props;
    const promisifyReleaseCall = (callId, userId, campaignId) => {
      return new Promise((resolve, reject) => {
        const err = releaseCall(userId, campaignId, callId);
        if (!err) {
          resolve(true);
        } else {
          reject(err);
        }
      });
    };
    return promisifyReleaseCall(call_id, user_id, campaign_id)
      .then(() => nextCall(user_id, campaign_id))
      .catch(err => console.log(err));
  }

  handleBadNameClick() {
    const { call_id, user_id, campaign_id, updateAttempt } = this.props;
    const outcome = 'BAD_NUMBER';
    return updateAttempt(user_id, campaign_id, call_id, outcome);
  }

  handleStopCallingClick() {
    const { history, call_id, user_id, campaign_id, releaseCall } = this.props;
    releaseCall(user_id, campaign_id, call_id);
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
            <Button onClick={this.handleBadNameClick} bsStyle="danger">Bad Name</Button>
            <Button onClick={this.handleStopCallingClick} bsStyle="info">Stop Calling</Button>
          </ButtonGroup>
        </div>
      </div>
    );
  }
}
