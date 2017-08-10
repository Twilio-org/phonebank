import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import { reducer as formReducer } from 'redux-form';

import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import immutable from 'redux-immutable-state-invariant';
import { createLogger } from 'redux-logger';

import { authStatusReducer, LOGOUT_USER } from './reducers/login';
import { accountInfoReducer } from './reducers/account_info';
import { questionOptionsReducer } from './reducers/script_form';

const appReducer = combineReducers({
  form: formReducer,
  auth: authStatusReducer,
  account_info: accountInfoReducer,
  script_form: questionOptionsReducer
});

const rootReducer = (state, action) => {
  const { type } = action;
  const newState = (type === LOGOUT_USER) ? undefined : state;
  return appReducer(newState, action);
};

const middleware = [immutable(), createLogger(), promise(), thunk];

const store = createStore(rootReducer, compose(applyMiddleware(...middleware)));

export default store;
