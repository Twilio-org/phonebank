import { applyMiddleware, createStore, combineReducers } from 'redux';
import { routerReducer, routerMiddeware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import immutable from 'redux-immutable-state-invariant';
import { createLogger } from 'redux-logger';
import { reducer as formReducer } from 'redux-form'; 

/*=====middleware=====*/
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

/*=====reducer imports=====*/
const appReducer = combineReducers({
  form: formReducer,
  routing: routerReducer
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

const middleware = [immutable(), createLogger(), promise(), thunk];

module.exports = createStore(rootReducer, applyMiddleware(...middleware));