import React, { Component } from 'react';

import PreCallButtonGroup from './pre_call_btn_grp';
import ActiveCallControl from './active_call_control';

export default class CallsSideBar extends Component {
  constructor(props) {
    super(props);
    // const clickHandlers = ['handleStartCallClick', 'handleNextClick', 'handleStopClick'];
    // clickHandlers.forEach((func) => {
    //   this[func] = this[func].bind(this);
    // });
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

  render() {
    const { status } = this.props;

    if (status === 'ASSIGNED') {
      const { current_call_contact_name,
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
      const { current_call_contact_name,
              handleSubmit,
              outcome,
              updateCallOutcome,
              updateAttempt,
              campaign_id,
              user_id,
              call_id } = this.props;

      return (
        <ActiveCallControl
          current_call_contact_name={current_call_contact_name}
          handleSubmit={handleSubmit}
          outcome={outcome}
          status={status}
          updateCallOutcome={updateCallOutcome}
          updateAttempt={updateAttempt}
          campaign_id={campaign_id}
          user_id={user_id}
          call_id={call_id}
        />
      );
    }
    return (
      <div>SideBar Loading</div>
    );
  }
}
