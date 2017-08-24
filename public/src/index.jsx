import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import '../stylesheets/app.less';

// Components:
import App from './components/app';

import PublicContainer from './containers/sub_apps/public_container';
import UsersContainer from './containers/sub_apps/users_container';
import AdminContainer from './containers/sub_apps/admin_container';

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
              exact
              path="/"
              render={() => (<Redirect to="/admin" />)}
            />
            <Route
              path="/admin"
              render={() => (isAdmin() && isLoggedIn() ?
                (<AdminContainer />) : (<Redirect to="/users" />))}
            />
            <Route
              path="/users"
              render={() => (isLoggedIn() ?
                (<UsersContainer />) : (<Redirect to="/public" />))}
            />
            <Route
              path="/public"
              component={PublicContainer}
            />
            <Route
              path="/logout"
              render={() => (<Redirect to="/public" />)}
            />
          </Switch>
        </App>
      </BrowserRouter>
    </Provider>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
