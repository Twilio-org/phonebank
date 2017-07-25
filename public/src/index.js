import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import '../stylesheets/app.less';
// Components
import App from './components/app';
import RegistrationForm from './containers/registration';
import LandingPage from './components/landing-page';

const Root = props => {
  return (
    <Provider store={store}>
      <BrowserRouter history={history}>
        <App>
          <Switch>
            <Route path="/registration" component={RegistrationForm} />
            <Route path="/" component={LandingPage} />
          </Switch>
        </App>
      </BrowserRouter>
    </Provider>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
