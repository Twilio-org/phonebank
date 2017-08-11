import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import '../stylesheets/app.less';
// Components
import App from './components/app';
import RegistrationForm from './containers/registration';
import LandingPage from './components/landing_page';
import LogInForm from './components/login';
import EditAccountInfo from './components/edit_account';
import ScriptNewFormContainer from './containers/script_form';
import { ConnectedAccountPage } from './components/account';
import { authTransition } from './actions/login';

const Root = () => {
  // checks if user id !==null and if authToken exists in localStorage;
  // will refactor to separate concerns;
  const isLoggedIn = authTransition.bind(null, store);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <App>
          <Switch>
            <Route
              path="/newScript"
              render={() => (<ScriptNewFormContainer />)}
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
              path="/"
              render={
               () => (isLoggedIn() ? (<LandingPage />) : (<Redirect to="/login" />))
              }
            />
          </Switch>
        </App>
      </BrowserRouter>
    </Provider>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
