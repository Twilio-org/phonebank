import React, { Component } from 'react';
import { ButtonGroup, Button, Row, Col } from 'react-bootstrap';

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
    const { call_id, user_id, campaign_id, submitCallResponses } = this.props;
    const params = { user_id, campaign_id, call_id, status: 'ATTEMPTED', outcome: 'BAD_NUMBER' };
    submitCallResponses(params);
  }

  handleStopCallingClick() {
    const { history,
            call_id,
            user_id,
            campaign_id,
            releaseCall,
            status,
            endVolunterTwilioCon,
            clearCurrentCall,
            enableCallControl,
            current_call } = this.props;
    if (current_call) {
      clearCurrentCall();
      releaseCall(user_id, campaign_id, call_id, status);
    }
    endVolunterTwilioCon(user_id, campaign_id);
    enableCallControl();
    history.push('/volunteers/campaigns');
  }

  render() {
    const { current_call_contact_name, disable_call_control } = this.props;
    return (
      <div>
        {
          disable_call_control ?
            (<h5>No Calls Available</h5>) :
            (<div>
              <Row>
                <Col md="4">
                  <div className={'contact-card'}>
                    <div className={'contact-photo calling'}>
                      <i className="material-icons">person</i>
                    </div>
                  </div>
                </Col>
                <Col md="8">
                  <h3>{current_call_contact_name}</h3>
                  <Button
                    onClick={this.handleStartCallingClick}
                    bsStyle="success"
                    disabled={disable_call_control}
                  >
                    <i className="material-icons small">phone_in_talk</i> Start Call
                  </Button>
                </Col>
              </Row>
            </div>)
        }
        <div>
          <ButtonGroup vertical id="pre_call_side">
            <Button
              onClick={this.handleSkipClick}
              bsStyle="warning"
              disabled={disable_call_control}
            >
              <i className="material-icons md-16">skip_next</i>
              Skip this person
            </Button>
            <Button
              onClick={this.handleBadNameClick}
              bsStyle="danger"
              disabled={disable_call_control}
            >
              <i className="material-icons md-16">block</i>
              Bad Name
            </Button>
            <Button
              onClick={this.handleStopCallingClick}
              bsStyle="info"
            >
              <i className="material-icons md-16">stop</i>
              Stop Calling
            </Button>
          </ButtonGroup>
        </div>
      </div>
    );
  }
}
