import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import CallsSideBar from './calls_sidebar';
import CallsPageMain from './calls_page_main';

export default class CallPage extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    const { user_id } = this.props;
    return this.props.assignToCall(user_id, id);
  }

  render() {
    const { current_campaign,
            has_user_joined_campaign,
            calls_made,
            next_call,
            current_call,
            script_questions,
            current_script,
            current_call_status,
            current_call_outcome,
            updateCallOutcome,
            updateCallStatus } = this.props;
    const isCurrentCall = !!Object.keys(current_call).length;
    return (
      <Row className="show-grid">
        <Col xs={5} md={4} lg={3}>
          <CallsSideBar
            is_current_call={isCurrentCall}
            current_campaign={current_campaign}
            joined_campaign={has_user_joined_campaign}
            call_status={current_call_status}
            call_outcome={current_call_outcome}
            calls_made={calls_made}
            updateCallStatus={updateCallStatus}
            updateCallOutcome={updateCallOutcome}
          />
        </Col>
        <Col xs={7} md={8} lg={9}>
          <CallsPageMain
            current_campaign={current_campaign}
            current_script={current_script}
            script_questions={script_questions}
            current_call={current_call}
            next_call={next_call}
          />
        </Col>
      </Row>
    );
  }
}
