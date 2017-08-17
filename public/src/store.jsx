import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import { reducer as formReducer } from 'redux-form';

import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import immutable from 'redux-immutable-state-invariant';
import { createLogger } from 'redux-logger';

import { authStatusReducer, LOGOUT_USER } from './reducers/login';
import { accountInfoReducer } from './reducers/account_info';
import { campaignListReducer } from './reducers/campaign';
import { campaignFormReducer } from './reducers/create_campaign';
import { questionOptionsReducer } from './reducers/script_form';
import { adminQuestionsReducer } from './reducers/admin_questions';
import { adminScriptsReducer } from './reducers/admin_scripts';

const appReducer = combineReducers({
  form: formReducer,
  auth: authStatusReducer,
  account_info: accountInfoReducer,
  admin_campaigns: campaignListReducer,
  campaign_form: campaignFormReducer,
  admin_questions: adminQuestionsReducer,
  admin_scripts: adminScriptsReducer,
  script_form: questionOptionsReducer
});

const rootReducer = (state, action) => {
  const { type } = action;
  const newState = (type === LOGOUT_USER) ? undefined : state;
  return appReducer(newState, action);
};

const middleware = [immutable(), createLogger(), promise(), thunk];

const store = createStore(rootReducer, compose(applyMiddleware(...middleware), autoRehydrate()));

persistStore(store);

export default store;
