import React, { Component } from 'react';

import CallControl from './callcntrl_btn_group';
import Toolbar from './btn_toolbar';
import SideBarForm from './side_bar_form';

export default class ActiveCallControl extends Component {
  constructor(props) {
    super(props);
    const clickHandlers = ['handleHangUp', 'handleSubmitResponses', 'handleOutcomeClick', 'syncOutcomeInForm'];
    clickHandlers.forEach((func) => {
      this[func] = this[func].bind(this);
    });
  }
  componentDidMount() {
    const { change, form, campaign_id, call_id, user_id, script_questions } = this.props;
    change(form, 'campaign_id', campaign_id);
    change(form, 'call_id', call_id);
    change(form, 'user_id', user_id);
    change(form, 'question_total', script_questions.length);
  }
  handleHangUp() {
    const { call_id, user_id, campaign_id, updateAttempt } = this.props;
    const params = { user_id, campaign_id, call_id, status: 'HUNG_UP' };
    updateAttempt(params);
  }

  handleSubmitResponses(values) {
    const { submitCallResponses } = this.props;
    const { question_total, ...data } = values;
    submitCallResponses({ ...data, status: 'ATTEMPTED' });
  }

  handleOutcomeClick(text) {
    const { updateCallOutcome, call_id, user_id, campaign_id, updateAttempt } = this.props;
    if (text !== 'ANSWERED') {
      const params = { user_id, campaign_id, call_id, status: 'HUNG_UP' };
      updateAttempt(params);
    }
    updateCallOutcome(text.toUpperCase());
  }
  syncOutcomeInForm(e) {
    const { change, form } = this.props;
    change(form, 'outcome', e.currentTarget.value);
  }
  render() {
    const { current_call_contact_name,
            handleSubmit,
            outcome,
            status,
            form_errors } = this.props;
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
          onChange={this.syncOutcomeInForm}
        />
        <div>
          <SideBarForm handleSubmit={handleSubmit} />
          <div>
            <CallControl
              handler={handleSubmit(this.handleSubmitResponses)}
              outcome={outcome}
              status={status}
              text="Submit and Next Call"
              htmlID="submit-call-form-btn"
              styled="success"
              invalid={typeof form_errors !== 'undefined'}
            />
          </div>
        </div>
      </div>
    );
  }
}
