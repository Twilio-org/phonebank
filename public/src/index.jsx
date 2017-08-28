import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import '../stylesheets/app.less';

import App from './components/app';

import PublicContainer from './containers/sub_apps/public_container';
import VolunteersContainer from './containers/sub_apps/volunteers_container';
import AdminContainer from './containers/sub_apps/admin_container';

function isLoggedIn() {
  const token = localStorage.getItem('auth_token');
  const id = Number(localStorage.getItem('user_id'));
  return !!id && !!token;
}

function isAdmin() {
  const is_admin = localStorage.getItem('permissions');
  return JSON.parse(is_admin);
}

const Root = () => (
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Switch>
          <Route
            path="/admin"
            render={() => (isAdmin() && isLoggedIn() ?
              (<AdminContainer />) : (<Redirect to="/volunteers" />))}
          />
          <Route
            path="/volunteers"
            render={() => (isLoggedIn() ?
              (<VolunteersContainer />) : (<Redirect to="/public" />))}
          />
          <Route
            path="/logout"
            render={() => (<Redirect to="/public" />)}
          />
          <Route
            path="/public"
            component={PublicContainer}
          />
        </Switch>
      </App>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
