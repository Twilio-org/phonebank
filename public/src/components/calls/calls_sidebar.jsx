import React, { Component } from 'react';

import Toolbar from './btn_toolbar';
import CallControl from './callcntrl_btn_group';
import SideBarForm from './side_bar_form';
import PreCallButtonGroup from './pre_call_btn_grp';

export default class CallsSideBar extends Component {
  constructor(props) {
    super(props);
    const clickHandlers = ['handleSubmitResponses', 'handleHangUp', 'handleStartCallClick', 'handleOutcomeClick', 'handleNextClick', 'handleStopClick'];
    clickHandlers.forEach((func) => {
      this[func] = this[func].bind(this);
    });
    this.fetchCallContactHelper = (context) => {
      if (context.props.contact_id) {
        const { contact_id, getCallContactInfo } = context.props;
        getCallContactInfo(contact_id);
      }
    };
  }

  componentDidMount() {
    this.fetchCallContactHelper(this);
  }

  componentDidUpdate() {
    this.fetchCallContactHelper(this);
  }

  handleStartCallClick() {
    const { updateCallStatus } = this.props;
    updateCallStatus('IN_PROGRESS');
  }

  handleOutcomeClick(text) {
    const { updateCallOutcome, updateCallStatus } = this.props;
    if (text !== 'ANSWERED') {
      updateCallStatus('HUNG_UP');
    }
    updateCallOutcome(text.toUpperCase());
  }

  handleNextClick() {
    const { user_id, campaign_id, nextCall } = this.props;
    nextCall(user_id, campaign_id);
  }

  handleStopClick() {
    const { history, user_id, campaign_id, call_id, status, releaseCall } = this.props;
    releaseCall(user_id, campaign_id, call_id, status);
    history.push('/volunteers/campaigns');
  }

  handleHangUp() {
    const { updateCallStatus } = this.props;
    updateCallStatus('HUNG_UP');
  }

  handleSubmitResponses() {
    console.log('THIS DOES NOTHING... NOTHING AT ALL!', this.props);
  }

  render() {
    const { status } = this.props;
    const outcomes = [
      {
        value: 'Answered',
        style: 'success'
      },
      {
        value: 'Bad Number',
        style: 'danger'
      },
      {
        value: 'Do Not Call',
        style: 'danger'
      },
      {
        value: 'No Answer',
        style: 'warning'
      },
      {
        value: 'Left Message',
        style: 'warning'
      },
      {
        value: 'Incomplete',
        style: 'warning'
      }
    ];

    if (status === 'ASSIGNED') {
      const { current_call_contact_name,
              updateCallStatus,
              history,
              call_id,
              user_id,
              campaign_id,
              updateAttempt,
              releaseCall,
              nextCall,
              clearVolunteerActive } = this.props;
      return (
        <PreCallButtonGroup
          history={history}
          status={status}
          updateCallStatus={updateCallStatus}
          current_call_contact_name={current_call_contact_name}
          call_id={call_id}
          user_id={user_id}
          campaign_id={campaign_id}
          updateAttempt={updateAttempt}
          releaseCall={releaseCall}
          nextCall={nextCall}
          clearVolunteerActive={clearVolunteerActive}
        />
      );
    }
    if (!!status && (status === 'IN_PROGRESS' || status === 'HUNG_UP')) {
      const { current_call_contact_name, handleSubmit, outcome } = this.props;

      return (
        <div>
          <div>Now Calling: {current_call_contact_name}</div>
          <Toolbar
            outcomes={outcomes}
            handleOutcome={this.handleOutcomeClick}
          />
          <div>
            <SideBarForm handleSubmit={handleSubmit} />
            <div>
              <CallControl
                submitHandler={this.handleSubmitResponses}
                handleHangUp={this.handleHangUp}
                outcome={outcome}
                status={status}
              />
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>SideBar Loading</div>
    );
  }
}
