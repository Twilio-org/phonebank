import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router, Route, Switch } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import store from './store';
// Components
import App from './components/app';

//this will have the root <provider />
const history = syncHistoryWithStore(browserHistory, store);

const Root = props => {
	return (
		<Provider store={store}>
			<Router history={history}>
				<Switch>
					<Route exact path="/" component={App} />
				</Switch>
			</Router>
		</Provider>

	);
}

ReactDOM.render(<Root />, document.getElementById('root'));