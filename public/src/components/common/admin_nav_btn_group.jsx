import React, { Component } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

export default class AdminDashboardButtonGroup extends Component {
  constructor(props) {
    super(props);
    this.handleQuestionsClick = this.handleQuestionsClick.bind(this);
    this.handleCampaignsClick = this.handleCampaignsClick.bind(this);
    this.handleScriptsClick = this.handleScriptsClick.bind(this);
  }

  handleQuestionsClick() {
    this.props.history.push('/admin_questions');
  }
  handleCampaignsClick() {
    this.props.history.push('/campaigns');
  }
  handleScriptsClick() {
    this.props.history.push('/admin_scripts');
  }

  render() {
    return (
      <ButtonGroup>
        <Button type="button" onClick={this.handleCampaignsClick}>All Campaigns</Button>
        <Button type="button" onClick={this.handleScriptsClick}>All Scripts</Button>
        <Button type="button" onClick={this.handleQuestionsClick}>All Questions</Button>
      </ButtonGroup>
    );
  }
}
