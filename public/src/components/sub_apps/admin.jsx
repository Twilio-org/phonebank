import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Containers:
import CampaignsContainer from '../../containers/list_campaigns';
import AdminQuestionsContainer from '../../containers/list_questions';
import AdminScriptsContainer from '../../containers/list_scripts';
import AdminContactListsContainer from '../../containers/list_contactlists';
import EditAccountInfo from '../../components/account/edit_account';
import CreateCampaignContainer from '../../containers/create_campaign';
import CreateScriptContainer from '../../containers/create_script';
import CreateQuestionContainer from '../../containers/create_question';
import ViewQuestionContainer from '../../containers/view_question';
import { ConnectedAccountPage } from '../../components/account/account';
import ScriptPage from '../../containers/view_script';
import AdminUsersContainer from '../../containers/list_users';
import CreateContactListContainer from '../../containers/create_contact_list';
import ViewCampaignContainer from '../../containers/view_campaign';

export default class Admin extends Component {
  componentDidMount() {
    const { id } = this.props.auth;
    const { fetchUser } = this.props;
    fetchUser(id);
  }

  render() {
    const parent = '/admin';
    return (
      <Switch>
        <Route
          exact
          path={`${parent}/questions/new`}
          component={CreateQuestionContainer}
        />
        <Route
          path={`${parent}/questions/:id`}
          component={ViewQuestionContainer}
        />
        <Route
          exact
          path={`${parent}/scripts/new`}
          component={CreateScriptContainer}
        />
        <Route
          exact
          path={`${parent}/account/:id/edit`}
          component={EditAccountInfo}
        />
        <Route
          path={`${parent}/account`}
          component={ConnectedAccountPage}
        />
        <Route
          path={`${parent}/campaigns/:id/view`}
          component={ViewCampaignContainer}
        />
        <Route
          exact
          path={`${parent}/campaigns/new`}
          component={CreateCampaignContainer}
        />
        <Route
          path={`${parent}/campaigns`}
          component={CampaignsContainer}
        />
        <Route
          path={`${parent}/scripts/:id`}
          component={ScriptPage}
        />
        <Route
          path={`${parent}/questions`}
          component={AdminQuestionsContainer}
        />
        <Route
          path={`${parent}/scripts`}
          component={AdminScriptsContainer}
        />
        <Route
          path={`${parent}/contactLists/new`}
          component={CreateContactListContainer}
        />
        <Route
          path={`${parent}/contactLists`}
          component={AdminContactListsContainer}
        />
        <Route
          path={`${parent}/users`}
          component={AdminUsersContainer}
        />
        <Redirect
          from={parent}
          to={`${parent}/campaigns`}
        />
      </Switch>
    );
  }
}
