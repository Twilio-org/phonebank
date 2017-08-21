import React, { Component } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

export default class AdminDashboardButtonGroup extends Component {
  constructor(props) {
    super(props);
    this.handleQuestionsClick = this.handleQuestionsClick.bind(this);
    this.handleCampaignsClick = this.handleCampaignsClick.bind(this);
    this.handleScriptsClick = this.handleScriptsClick.bind(this);
    this.handleContactListsClick = this.handleContactListsClick.bind(this);
  }

  handleQuestionsClick() {
    this.props.history.push('/admin/questions');
  }
  handleCampaignsClick() {
    this.props.history.push('/admin/campaigns');
  }
  handleScriptsClick() {
    this.props.history.push('/admin/scripts');
  }
  handleContactListsClick() {
    this.props.history.push('/admin/contactLists');
  }

  render() {
    return (
      <ButtonGroup>
        <Button type="button" onClick={this.handleCampaignsClick}>All Campaigns</Button>
        <Button type="button" onClick={this.handleScriptsClick}>All Scripts</Button>
        <Button type="button" onClick={this.handleQuestionsClick}>All Questions</Button>
        <Button type="button" onClick={this.handleContactListsClick}>All Contact Lists</Button>
      </ButtonGroup>
    );
  }
}
