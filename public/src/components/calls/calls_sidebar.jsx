import React, { Component } from 'react';

export default class CallsSideBar extends Component {
  componentDidMount() {
    console.log(this.props);
  }

  handleStartCallClick() {
    // start call
      // set status to in progress
  }

  handleOutcomeClick() {
    // select outcome and
      // set outcome in current call
  }

  handleNextClick() {
    // assign new call
  }

  handleStopClick() {
    // stop calling..?
  }
 
  render() {
    const { current_campaign,
            joined_campaign,
            call_status,
            call_outcome,
            calls_made,
            updateCallStatus,
            updateCallOutcome,
            is_current_call } = this.props;

    if (!is_current_call) {
      // return button for starting first call
    }
    if (call_status === 'IN_PROGRESS') {
      // return render of status btn group, notes field,
      // and next/stop btn group
    }
    return (
      <div>Meow, this is the calls sidebar~!</div>
    );
  }
}
