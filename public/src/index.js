import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import css from '../stylesheets/app.scss';
// Components
import App from './components/app';
import RegistrationForm from './containers/registration';
import LandingPage from './components/landing-page'
import LogInForm from './components/login';

const Root = props => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/registration" component={RegistrationForm} />
            <Route path="/login" component={LogInForm} />
            <Route path="/" component={App} />
          </Switch>
        </App>
      </BrowserRouter>
    </Provider>
  );
}

ReactDOM.render(<Root />, document.getElementById('root'));
