import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import CallsSideBar from './calls_sidebar';
import CallsPageMain from './calls_page_main';

export default class CallPage extends Component {
  componentDidMount() {
    console.log('#############meow', this.props);
    // const { current_campaign,
    //         has_user_joined_campaign,
    //         calls_made,
    //         next_call,
    //         current_call,
    //         script_questions,
    //         current_script } = this.props;
    const { current_campaign, fetchScript, fetchScriptQuestions } = this.props;
    const { script_id } = current_campaign;
    fetchScript(script_id);
    fetchScriptQuestions(script_id);
  }

  render() {
    const { current_campaign,
            has_user_joined_campaign,
            calls_made,
            next_call,
            current_call,
            script_questions,
            current_script, ...storeProps } = this.props;
    return (
      <Row className="show-grid">
        <Col xs={5} md={4} lg={3}>
          <CallsSideBar
            current_campaign={current_campaign}
            joined_campaign={has_user_joined_campaign}
            calls_made={calls_made}
          />
        </Col>
        <Col xs={7} md={8} lg={9}>
          <CallsPageMain
            current_campaign={current_campaign}
            current_script={current_script}
            script_questions={script_questions}
            current_call={current_call}
            next_call={next_call}
            {...storeProps}
          />
        </Col>
      </Row>
    );
  }
}
