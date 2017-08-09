import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import '../stylesheets/app.less';
// Components
import App from './components/app';
import RegistrationForm from './containers/registration';
import CampaignsContainer from './containers/CampaignsContainer';
import LandingPage from './components/landing_page';
import LogInForm from './components/login';
import AccountPage from './components/account';
import EditAccountInfo from './components/edit_account';

import { authTransition, checkIfAdmin } from './actions/login';

const Root = () => {
  const isLoggedIn = authTransition.bind(null, store);
  const isAdmin = checkIfAdmin.bind(null, store);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <App>
          <Switch>
            <Route
              path="/registration"
              render={
               () => (!isLoggedIn() ? (<RegistrationForm />) : (<Redirect to="/" />))
              }
            />
            <Route
              path="/login"
              render={
               () => (isLoggedIn() ? (<Redirect to="/account" />) : (<LogInForm />))
              }
            />
            <Route
              exact
              path="/account/:id/edit"
              render={
               () => (isLoggedIn() ? (<EditAccountInfo />) : (<Redirect to="/login" />))
              }
            />
            <Route
              path="/account"
              render={
               () => (isLoggedIn() ? (<AccountPage />) : (<Redirect to="/login" />))
              }
            />
            <Route
              path="/campaigns"
              render={
                () => (isLoggedIn() && isAdmin() ?
                  (<CampaignsContainer />) : (<Redirect to="/login" />))
              }
            />
            <Route
              exact
              path="/"
              render={
               () => (isLoggedIn() ? (<LandingPage />) : (<Redirect to="/" />))
              }
            />
          </Switch>
        </App>
      </BrowserRouter>
    </Provider>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
