import { applyMiddleware, createStore, combineReducers } from 'redux';
import { routeReducer, routerMiddeware } from 'react-router-redux';
import { browserHistory } from 'react-router';

/*=====middleware=====*/

import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

/*=====reducer imports=====*/

const appReducer = combineReducers({
	//reducers go here;
});

const rootReducer = (state, action) => {
	if(action.type === 'LOGOUT_USER')	{
		state = undefined;
	}
	return appReducer(state, action);
}

// const middleware = process.env.NODE_ENV !== 'production' ?
//   [require('redux-immutable-state-invariant').default(), require('logger')(), promise(), thunk] :
//   [promise(), thunk];

const middleware = [require('redux-immutable-state-invariant').default(), require('redux-logger')(), promise(), thunk];

module.exports = createStore(rootReducer, applyMiddleware(...middleware));
//this will create the redux store and house the combined reducers