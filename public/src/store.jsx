import { applyMiddleware, createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

/*=====middleware=====*/
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import immutable from 'redux-immutable-state-invariant';
import { createLogger } from 'redux-logger';
//uncomment next line and comment out previous four lines when NODE_ENV is set
// import middleware from './reduxMiddleware';

/*=====reducer imports=====*/
import { authStatusReducer, LOGOUT_USER } from './reducers/login';
import { accountInfoReducer } from './reducers/account_info';

const appReducer = combineReducers({
  form: formReducer,
  auth: authStatusReducer,
  account_info: accountInfoReducer
});

const rootReducer = (state, action) => {
  if(action.type === LOGOUT_USER)	{
    state = undefined;
  }
  return appReducer(state, action);
}

const middleware = [immutable(), createLogger(), promise(), thunk];

module.exports = createStore(rootReducer, applyMiddleware(...middleware));
