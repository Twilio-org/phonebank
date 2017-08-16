import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import '../stylesheets/app.less';
// Components
import App from './components/app';
import RegistrationForm from './containers/registration';
import CampaignsContainer from './containers/list_campaigns';
import AdminQuestionsContainer from './containers/list_questions';
import AdminScriptsContainer from './containers/list_scripts';
// import LandingPage from './components/landing_page';
import LogInForm from './components/login';
import EditAccountInfo from './components/account/edit_account';
import CreateCampaignContainer from './containers/create_campaign';
import CreateScriptContainer from './containers/create_script';
import CreateQuestionContainer from './containers/create_question';
import { ConnectedAccountPage } from './components/account/account';
// import { authTransition, checkIfAdmin } from './actions/login';
import { authTransition } from './actions/login';

const Root = () => {
  const isLoggedIn = authTransition.bind(null, store);
  // const isAdmin = checkIfAdmin.bind(null, store);

  // const landingPage = () => (isAdmin() ? (<CampaignsContainer />) : (<LandingPage />));

  return (
    <Provider store={store}>
      <BrowserRouter>
        <App>
          <Switch>
            <Route
              path="/admin/questions/new"
              render={() => (isLoggedIn() ?
                (<CreateQuestionContainer />) : (<Redirect to="/login" />))}
            />
            <Route
              path="/admin/scripts/new"
              render={() => (isLoggedIn() ?
                (<CreateScriptContainer />) : (<Redirect to="/login" />))}
            />
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
              path="/admin/campaigns/new"
              render={
               () => (isLoggedIn() ? (<CreateCampaignContainer />) : (<Redirect to="/login" />))
              }
            />
            <Route
              path="/campaigns"
              render={
                () => (isLoggedIn() ?
                  (<CampaignsContainer />) : (<Redirect to="/login" />))
              }
            />
            <Route
              exact
              path="/"
              render={
                () => (isLoggedIn() ?
                  (<CampaignsContainer />) : (<Redirect to="/login" />))
              }
            />
            <Route
              path="/admin_questions"
              render={
                () => (isLoggedIn() ?
                  (<AdminQuestionsContainer />) : (<Redirect to="/" />))
              }
            />
            <Route
              path="/admin_scripts"
              render={
                () => (isLoggedIn() ?
                  (<AdminScriptsContainer />) : (<Redirect to="/" />))
              }
            />
          </Switch>
        </App>
      </BrowserRouter>
    </Provider>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));

// TODO: Will be added back later:
// <Route
//   exact
//   path="/"
//   render={
//    () => (isLoggedIn() ? landingPage() : (<Redirect to="/login" />))
//   }
// />
