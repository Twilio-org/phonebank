import React, { Component } from 'react';

import CallControl from './callcntrl_btn_group';
import Toolbar from './btn_toolbar';
import SideBarForm from './side_bar_form';

export default class ActiveCallControl extends Component {
  constructor(props) {
    super(props);
    const clickHandlers = ['handleHangUp', 'handleSubmitResponses', 'handleOutcomeClick', 'updateOutcome'];
    clickHandlers.forEach((func) => {
      this[func] = this[func].bind(this);
    });
    // this.syncFormData = (change, form, campaign_id, call_id, user_id, outcome) => {
    //   return new Promise((resolve, reject) => {
    //     change(form, 'campaign_id', campaign_id);
    //     change(form, 'call_id', call_id);
    //     change(form, 'outcome', outcome);
    //     change(form, 'user_id', user_id);
    //   });
    // };
  }

  handleHangUp() {
    const { updateCallStatus } = this.props;
    updateCallStatus('HUNG_UP');
  }

  handleSubmitResponses() {
    console.log('THESE ARE PROPS=============', this.props);
    const { status,
            updateCallStatus,
            form,
            submit } = this.props;
    if (status === 'IN_PROGRESS') {
      updateCallStatus('HUNG_UP');
    }
    submit(form);
      // if call is still in progress, hang up
    // submit form data
      // validate that call outcome should have been clicked
    // fetch new call
  }

  handleOutcomeClick(text) {
    const { updateCallOutcome, updateCallStatus } = this.props;
    if (text !== 'ANSWERED') {
      updateCallStatus('HUNG_UP');
    }
    updateCallOutcome(text.toUpperCase());
  }
  updateOutcome(e) {
    const { change, form } = this.props;
    change(form, 'outcome', e.currentTarget.value);
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
          onChange={this.updateOutcome}
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
