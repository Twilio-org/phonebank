import immutable from 'redux-immutable-state-invariant';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

const middleware = process.env.NODE_ENV === 'dev' ? [immutable(), createLogger(), promise(), thunk] : [ promise(), thunk];

module.exports = middleware;