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
            updateCallOutcome,
            updateCallStatus,
            contact_name,
            contact_number,
            status,
            outcome,
            getContactInfo,
            assignToCall,
            user_id,
            history } = this.props;
    const { id } = current_campaign;
    if (current_call) {
      const { status: callStatus, outcome: callOutcome, contact_id } = current_call;
      return (
        <Row className="show-grid">
          <Col xs={5} md={4} lg={3}>
            <CallsSideBar
              current_campaign={current_campaign}
              joined_campaign={has_user_joined_campaign}
              call_status={callStatus}
              call_outcome={callOutcome}
              contact_name={contact_name}
              contact_number={contact_number}
              calls_made={calls_made}
              updateCallStatus={updateCallStatus}
              updateCallOutcome={updateCallOutcome}
              status={status}
              outcome={outcome}
              getContactInfo={getContactInfo}
              contact_id={contact_id}
              nextCall={assignToCall}
              current_call={current_call}
              user_id={user_id}
              camp_id={id}
              history={history}
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
    return null;
  }
}
