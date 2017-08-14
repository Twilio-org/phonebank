import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import { reducer as formReducer } from 'redux-form';

import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import immutable from 'redux-immutable-state-invariant';
import { createLogger } from 'redux-logger';

import { authStatusReducer, LOGOUT_USER } from './reducers/login';
import { accountInfoReducer } from './reducers/account_info';
import { scriptOptionsReducer, contactListOptionsReducer, campaignListReducer } from './reducers/campaign';
import { questionOptionsReducer } from './reducers/script_form';
import { adminQuestionsReducer } from './reducers/admin_questions';
import { adminScriptsReducer } from './reducers/admin_scripts';

const appReducer = combineReducers({
  form: formReducer,
  auth: authStatusReducer,
  account_info: accountInfoReducer,
  campaigns: campaignListReducer,
  admin_questions: adminQuestionsReducer,
  admin_scripts: adminScriptsReducer,
  script_form: questionOptionsReducer,
  campaign_form_scripts: scriptOptionsReducer,
  campaign_form_contact_lists: contactListOptionsReducer
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
