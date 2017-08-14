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
import AdminQuestionsContainer from './containers/AdminQuestionsContainer';
import LandingPage from './components/landing_page';
import LogInForm from './components/login';
import EditAccountInfo from './components/edit_account';
import { ConnectedAccountPage } from './components/account';

import { authTransition, checkIfAdmin } from './actions/login';

const Root = () => {
  const isLoggedIn = authTransition.bind(null, store);
  const isAdmin = checkIfAdmin.bind(null, store);

  const landingPage = () => (isAdmin() ? (<CampaignsContainer />) : (<LandingPage />));

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
               () => (isLoggedIn() ? (<ConnectedAccountPage />) : (<Redirect to="/login" />))
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
              path="/admin_questions"
              render={
                () => (isLoggedIn() && isAdmin() ?
                  (<AdminQuestionsContainer />) : (<Redirect to="/" />))
              }
            />
            <Route
              exact
              path="/"
              render={
               () => (isLoggedIn() ? landingPage() : (<Redirect to="/login" />))
              }
            />
          </Switch>
        </App>
      </BrowserRouter>
    </Provider>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
