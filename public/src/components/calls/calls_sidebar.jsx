import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
// import { Field } from 'redux-form';

import Toolbar from './btn_toolbar';
import CallControl from './callcntrl_btn_group';

export default class CallsSideBar extends Component {
  constructor(props) {
    super(props);
    // const clickHandlers = ['handleStartCallClick', 'handleStartCallClick', 'handleOutcomeClick', 'handleNextClick', 'handleStopClick'];
    // clickHandlers.forEach((func) => {
    //   this[func] = this[func].bind(this);
    // });
    this.handleStartCallClick = this.handleStartCallClick.bind(this);
    this.handleOutcomeClick = this.handleOutcomeClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handleStopClick = this.handleStopClick.bind(this);
  }

  componentDidUpdate() {
    if (this.props.contact_id) {
      const { contact_id } = this.props;
      // this.props.getContactInfo(contact_id);
    }
  }

  handleStartCallClick() {
    const { updateCallStatus } = this.props;
    return updateCallStatus('IN_PROGRESS');
  }

  handleOutcomeClick(text) {
    const { updateCallOutcome, updateCallStatus } = this.props;
    updateCallOutcome(text.toUpperCase());
    // updateCallStatus('ATTEMPTED');
  }

  handleNextClick() {
    const { user_id, camp_id, current_call, nextCall } = this.props;
    nextCall(user_id, camp_id, current_call);
  }

  handleStopClick() {
    const { history } = this.props;
    history.push('/volunteers/campaigns');
  }

  render() {
    // const { call_status,
    //         call_outcome,
    //         status,
    //         outcome } = this.props;
    const { status, outcome } = this.props;
    const outcomes = [
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
        style: 'warn'
      },
      {
        value: 'Left Message',
        style: 'warn'
      },
      {
        value: 'Incomplete',
        style: 'warn'
      },
      {
        value: 'Answered',
        style: 'success'
      }
    ];
    if (status === 'ASSIGNED') {
      return (<Button onClick={this.handleStartCallClick}>Connect Call</Button>);
    }
    if (!!status && status === 'IN_PROGRESS') {
      return (
        <div>Call Active
          <Toolbar
            outcomes={outcomes}
            handleOutcome={this.handleOutcomeClick}
          />
          <div>
            <div>
              <form>
                <textarea rows="5" cols="13" placeholder="notes"  />
              </form>
            </div>
              <div>
                <CallControl handleNext={this.handleNextClick} handleStop={this.handleStopClick} />
              </div>
          </div>

        </div>
      );
    }
    return (
      <div>Meow, this is the calls sidebar~!</div>
    );
  }
}
