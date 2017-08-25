import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import EditAccountInfo from '../../components/account/edit_account';
import { ConnectedAccountPage } from '../../components/account/account';
import LandingPage from '../../components/landing_page';

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
        <Route component={LandingPage} />
      </Switch>
    );
  }
}

