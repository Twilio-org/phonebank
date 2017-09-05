import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import CallsSideBar from './calls_sidebar';
import CallsPageMain from './calls_page_main';

export default class CallPage extends Component {
  componentDidMount() {
    const { id: campaign_id } = this.props.match.params;
    const { user_id,
            current_campaign,
            fetchScript,
            fetchScriptQuestions,
            assignToCall } = this.props;
    const { script_id } = current_campaign;
    assignToCall(user_id, campaign_id);
    fetchScript(script_id);
    fetchScriptQuestions(script_id);
  }

  render() {
    const { current_campaign,
            has_user_joined_campaign,
            calls_made,
            current_call,
            script_questions,
            current_script,
            updateCallOutcome,
            updateCallStatus,
            contact_name,
            contact_number,
            getCallContactInfo,
            assignToCall,
            user_id,
            history,
            ...storeProps } = this.props;
    const { id } = current_campaign;
    if (current_call) {
      const { status,
              outcome,
              contact_id } = this.props;
      return (
        <Row className="show-grid">
          <Col xs={5} md={4} lg={3}>
            <CallsSideBar
              current_campaign={current_campaign}
              joined_campaign={has_user_joined_campaign}
              contact_name={contact_name}
              contact_number={contact_number}
              calls_made={calls_made}
              status={status}
              outcome={outcome}
              contact_id={contact_id}
              nextCall={assignToCall}
              current_call={current_call}
              user_id={user_id}
              campaign_id={id}
              history={history}
              updateCallStatus={updateCallStatus}
              updateCallOutcome={updateCallOutcome}
              getCallContactInfo={getCallContactInfo}
            />
          </Col>
          <Col xs={7} md={8} lg={9}>
            <CallsPageMain
              current_campaign={current_campaign}
              current_script={current_script}
              script_questions={script_questions}
              current_call={current_call}
              {...storeProps}
            />
          </Col>
        </Row>
      );
    }
    return null;
  }
}
