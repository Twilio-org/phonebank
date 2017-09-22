import React, { Component } from 'react';

import PreCallButtonGroup from './pre_call_btn_grp';
import ActiveCallControl from './active_call_control';

export default class CallsSideBar extends Component {
  constructor(props) {
    super(props);
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
    const { status, disable_call_control } = this.props;

    if (status === 'ASSIGNED' || disable_call_control === true) {
      const { current_call_contact_name,
              history,
              call_id,
              user_id,
              campaign_id,
              updateAttempt,
              releaseCall,
              nextCall,
              endVolunterTwilioCon,
              clearCurrentCall,
              disableCallControl,
              enableCallControl,
              current_call,
              submitCallResponses } = this.props;
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
          endVolunterTwilioCon={endVolunterTwilioCon}
          clearCurrentCall={clearCurrentCall}
          disable_call_control={disable_call_control}
          disableCallControl={disableCallControl}
          enableCallControl={enableCallControl}
          current_call={current_call}
          submitCallResponses={submitCallResponses}
        />
      );
    }
    if (!!status && (status === 'IN_PROGRESS' || status === 'HUNG_UP')) {
      const { current_call_contact_name,
              outcome,
              updateCallOutcome,
              updateAttempt,
              campaign_id,
              user_id,
              call_id,
              change,
              submitCallResponses,
              ...otherProps } = this.props;

      return (
        <ActiveCallControl
          current_call_contact_name={current_call_contact_name}
          outcome={outcome}
          status={status}
          campaign_id={campaign_id}
          user_id={user_id}
          call_id={call_id}
          updateCallOutcome={updateCallOutcome}
          updateAttempt={updateAttempt}
          change={change}
          submitCallResponses={submitCallResponses}
          {...otherProps}
        />
      );
    }
    return (
      <div>SideBar Loading</div>
    );
  }
}
