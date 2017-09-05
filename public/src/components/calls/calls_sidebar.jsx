import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import Toolbar from './btn_toolbar';
import CallControl from './callcntrl_btn_group';
import SideBarForm from './side_bar_form';

export default class CallsSideBar extends Component {
  constructor(props) {
    super(props);
    const clickHandlers = ['handleStartCallClick', 'handleOutcomeClick', 'handleNextClick', 'handleStopClick'];
    clickHandlers.forEach((func) => {
      this[func] = this[func].bind(this);
    });
  }

  componentDidMount() {
    if (this.props.contact_id) {
      const { contact_id, getCallContactInfo } = this.props;
      getCallContactInfo(contact_id);
    }
  }

  shouldComponentUpdate() {
    const { status } = this.props;
    if (status === 'ASSIGNED' || 'AVAILABLE') {
      return true;
    }
    return false;
  }

  handleStartCallClick() {
    const { updateCallStatus } = this.props;
    return updateCallStatus('IN_PROGRESS');
  }

  handleOutcomeClick(text) {
    const { updateCallOutcome, updateCallStatus } = this.props;
    updateCallOutcome(text.toUpperCase());
    updateCallStatus('ATTEMPTED');
  }

  handleNextClick() {
    const { user_id, campaign_id, nextCall } = this.props;
    nextCall(user_id, campaign_id);
  }

  handleStopClick() {
    const { history } = this.props;
    history.push('/volunteers/campaigns');
  }

  render() {
    const { status, user_call_sid } = this.props;
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

    if (status === 'ASSIGNED' && !!user_call_sid) {
      return (<Button onClick={this.handleStartCallClick}>Connect Call</Button>);
    }
    if (!!status && status === 'IN_PROGRESS') {
      const { contact_name, handleSubmit } = this.props;

      return (
        <div>
          <div>Now Calling: {contact_name}</div>
          <Toolbar
            outcomes={outcomes}
            handleOutcome={this.handleOutcomeClick}
          />
          <div>
            <SideBarForm handleSubmit={handleSubmit} />
            <div>
              <CallControl handleNext={this.handleNextClick} handleStop={this.handleStopClick} />
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
