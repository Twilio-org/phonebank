import React, { Component } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

const ADMIN_PATH = '/admin';
const VOLUNTEERS_PATH = '/volunteers';
const CAMPAIGNS_PATH = '/campaigns';
const QUESTIONS_PATH = '/questions';
const SCRIPTS_PATH = '/scripts';
const CONTACT_LISTS_PATH = '/contactLists';
const USERS_PATH = '/users';

export default class DashboardButtonGroup extends Component {
  constructor(props) {
    super(props);
    this.handleQuestionsClick = this.handleQuestionsClick.bind(this);
    this.handleCampaignsClick = this.handleCampaignsClick.bind(this);
    this.handleScriptsClick = this.handleScriptsClick.bind(this);
    this.handleContactListsClick = this.handleContactListsClick.bind(this);
    this.handleAvailCampaignsClick = this.handleAvailCampaignsClick.bind(this);
    this.handleJoinedCampaignsClick = this.handleJoinedCampaignsClick.bind(this);
    this.handleUsersClick = this.handleUsersClick.bind(this);
  }

  handleQuestionsClick() {
    this.props.history.push(ADMIN_PATH + QUESTIONS_PATH);
  }
  handleCampaignsClick() {
    this.props.history.push(ADMIN_PATH + CAMPAIGNS_PATH);
  }
  handleScriptsClick() {
    this.props.history.push(ADMIN_PATH + SCRIPTS_PATH);
  }
  handleContactListsClick() {
    this.props.history.push(ADMIN_PATH + CONTACT_LISTS_PATH);
  }
  handleAvailCampaignsClick() {
    this.props.history.push(`${VOLUNTEERS_PATH}${CAMPAIGNS_PATH}/all`);
  }
  handleJoinedCampaignsClick() {
    this.props.history.push(VOLUNTEERS_PATH + CAMPAIGNS_PATH);
  }
  handleUsersClick() {
    this.props.history.push(ADMIN_PATH + USERS_PATH);
  }

  render() {
    const pathname = this.props.history.location ? this.props.history.location.pathname : '';
    return (
      <div id={'dashboard-button-group'}>
        {this.props.is_admin ? (
          <ButtonGroup>
            <Button
              type="button"
              onClick={this.handleCampaignsClick}
              className={pathname && pathname === `${ADMIN_PATH}${CAMPAIGNS_PATH}` ? 'active' : ''}
            >
              All Campaigns
            </Button>
            <Button
              type="button"
              onClick={this.handleScriptsClick}
              className={pathname && pathname === `${ADMIN_PATH}${SCRIPTS_PATH}` ? 'active' : ''}
            >
              All Scripts
            </Button>
            <Button
              type="button"
              onClick={this.handleQuestionsClick}
              className={pathname && pathname === `${ADMIN_PATH}${QUESTIONS_PATH}` ? 'active' : ''}
            >
              All Questions
            </Button>
            <Button
              type="button"
              onClick={this.handleContactListsClick}
              className={pathname && pathname === `${ADMIN_PATH}${CONTACT_LISTS_PATH}` ? 'active' : ''}
            >
              All Contact Lists
            </Button>
            <Button
              type="button"
              onClick={this.handleUsersClick}
              className={pathname && pathname === `${ADMIN_PATH}${USERS_PATH}` ? 'active' : ''}
            >
              All Users
            </Button>
          </ButtonGroup>
        ) : (
          <ButtonGroup>
            <Button
              type="button"
              onClick={this.handleJoinedCampaignsClick}
              className={pathname && pathname === `${VOLUNTEERS_PATH}${CAMPAIGNS_PATH}` ? 'active' : ''}
            >
              My Campaigns
            </Button>
            <Button
              type="button"
              onClick={this.handleAvailCampaignsClick}
              className={pathname && pathname === `${VOLUNTEERS_PATH}${CAMPAIGNS_PATH}/all` ? 'active' : ''}
            >
              All Campaigns
            </Button>
          </ButtonGroup>
        )}
      </div>
    );
  }
}
