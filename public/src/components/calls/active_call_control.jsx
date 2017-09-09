import React, { Component } from 'react';

import CallControl from './callcntrl_btn_group';
import Toolbar from './btn_toolbar';
import SideBarForm from './side_bar_form';

export default class ActiveCallControl extends Component {
  constructor(props) {
    super(props);
    const clickHandlers = ['handleHangUp', 'handleSubmitResponses', 'handleOutcomeClick'];
    clickHandlers.forEach((func) => {
      this[func] = this[func].bind(this);
    });
  }

  handleHangUp() {
    const { call_id, user_id, campaign_id, updateAttempt } = this.props;
    const params = { user_id, campaign_id, call_id, status: 'HUNG_UP' };
    updateAttempt(params);
  }

  handleSubmitResponses() {
    console.log('THIS DOES NOTHING... NOTHING AT ALL!', this.props);
  }

  handleOutcomeClick(text) {
    const { updateCallOutcome, call_id, user_id, campaign_id, updateAttempt } = this.props;
    if (text !== 'ANSWERED') {
      const params = { user_id, campaign_id, call_id, status: 'HUNG_UP' };
      updateAttempt(params);
    }
    updateCallOutcome(text.toUpperCase());
  }

  render() {
    const { current_call_contact_name, handleSubmit, outcome, status } = this.props;
    const outcomes = [
      {
        value: 'Answered',
        styled: 'success',
        icon: 'done'
      },
      {
        value: 'Bad Number',
        styled: 'danger',
        icon: 'block'
      },
      {
        value: 'Do Not Call',
        styled: 'danger',
        icon: 'cancel'
      },
      {
        value: 'No Answer',
        styled: 'warning',
        icon: 'call_missed'
      },
      {
        value: 'Left Message',
        styled: 'warning',
        icon: 'mic'
      },
      {
        value: 'Incomplete',
        styled: 'warning',
        icon: 'indeterminate_check_box'
      }
    ];
    return (
      <div>
        <h5>Now Calling:</h5>
        <h3>{current_call_contact_name}</h3>
        <div>
          <CallControl
            handler={this.handleHangUp}
            outcome={outcome}
            status={status}
            text="Hang Up"
            htmlID="hang-up-btn"
            styled="danger"
          />
        </div>
        <Toolbar
          outcomes={outcomes}
          handleOutcome={this.handleOutcomeClick}
        />
        <div>
          <SideBarForm handleSubmit={handleSubmit} />
          <div>
            <CallControl
              handler={this.handleSubmitResponses}
              outcome={outcome}
              status={status}
              text="Submit and Next Call"
              htmlID="submit-call-form-btn"
              styled="success"
            />
          </div>
        </div>
      </div>
    );
  }
}
