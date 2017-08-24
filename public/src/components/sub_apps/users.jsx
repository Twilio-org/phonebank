import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import EditAccountInfo from '../../components/account/edit_account';
import { ConnectedAccountPage } from '../../components/account/account';
import LandingPage from '../../components/landing_page';

export default class Users extends Component {
  componentDidMount() {
    console.log('this.props in user: ', this.props)
    const { id } = this.props.auth;
    const { fetchUser } = this.props;
    fetchUser(id);
  }

  render() {
    const parent = '/users';
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
          path={`${parent}`}
          component={LandingPage}
        />
      </Switch>
    );
  }
}

