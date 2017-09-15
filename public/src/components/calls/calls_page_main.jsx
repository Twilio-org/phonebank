import React, { Component } from 'react';
import { PageHeader, HelpBlock, Panel } from 'react-bootstrap';
import CallsForm from './calls_form';

export default class CallsPageMain extends Component {
  render() {
    const { current_campaign, current_script, script_questions, ...storeProps } = this.props;
    return (
      <div>
        <PageHeader>{current_campaign.title}</PageHeader>
        <p className="lead">{current_campaign.description}</p>
        <HelpBlock>{current_script.description}</HelpBlock>
        <Panel header={<h3>Script</h3>}>{current_script.body}</Panel>
        <CallsForm
          questions={script_questions}
          {...storeProps}
        />
      </div>
    );
  }
}
