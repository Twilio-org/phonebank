import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import CampaignsContainer from '../../containers/list_campaigns';
import EditAccountInfo from '../../components/account/edit_account';
import { ConnectedAccountPage } from '../../components/account/account';
import CallsContainer from '../../containers/view_create_calls';
import JoinedCampaignsContainer from '../../containers/joined_campaigns';

export default class Volunteers extends Component {
  componentDidMount() {
    const { id } = this.props.auth;
    const { fetchUser } = this.props;
    fetchUser(id);
  }

  render() {
    const parent = '/volunteers';
    return (
      <Switch>
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
          exact
          path={`${parent}/campaigns/:id/calls`}
          component={CallsContainer}
        />
        <Route
          path={`${parent}/campaigns/all`}
          component={CampaignsContainer}
        />
        <Route
          path={`${parent}/campaigns`}
          component={JoinedCampaignsContainer}
        />
        <Redirect from={parent} to={`${parent}/campaigns`} />
      </Switch>
    );
  }
}
