import React, { Component } from 'react';
import { HelpBlock } from 'react-bootstrap';
import CallControlButton from './callcntrl_btn';
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
    const formInvalid = typeof form_errors !== 'undefined';
    const outcomes = [
      {
        value: 'ANSWERED',
        label: 'Answered',
        styled: 'success',
        icon: 'done'
      },
      {
        value: 'BAD_NUMBER',
        label: 'Bad Number',
        styled: 'danger',
        icon: 'block'
      },
      {
        value: 'DO_NOT_CALL',
        label: 'Do Not Call',
        styled: 'danger',
        icon: 'cancel'
      },
      {
        value: 'NO_ANSWER',
        label: 'No Answer',
        styled: 'warning',
        icon: 'call_missed'
      },
      {
        value: 'LEFT_MESSAGE',
        label: 'Left Message',
        styled: 'warning',
        icon: 'mic'
      },
      {
        value: 'INCOMPLETE',
        label: 'Incomplete',
        styled: 'warning',
        icon: 'indeterminate_check_box'
      }
    ];
    return (
      <div>
        <h5>Now Calling:</h5>
        <h3>{current_call_contact_name}</h3>
        <div>
          <CallControlButton
            disabled={status !== 'IN_PROGRESS'}
            handler={this.handleHangUp}
            materialIcon={'call_end'}
            text={status === 'HUNG_UP' ? 'Call Ended' : 'Hang Up'}
            id="hang-up-btn"
            bsStyle="danger"
          />
        </div>
        <Toolbar
          outcomes={outcomes}
          handleOutcome={this.handleOutcomeClick}
          onChange={this.syncOutcomeInForm}
        />
        <div>
          <SideBarForm />
          <div>
            {formInvalid && <HelpBlock>Complete survey responses before submit</HelpBlock>}
            {!formInvalid && status !== 'HUNG_UP' && <HelpBlock> Hang up call before submit</HelpBlock>}
            <CallControlButton
              disabled={outcome === 'PENDING' || (outcome === 'ANSWERED' && status !== 'HUNG_UP') || formInvalid}
              handler={handleSubmit(this.handleSubmitResponses)}
              materialIcon={'skip_next'}
              text="Submit and Next Call"
              id="submit-call-form-btn"
              bsStyle="success"
            />
          </div>
        </div>
      </div>
    );
  }
}
