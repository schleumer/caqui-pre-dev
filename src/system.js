import axios from 'axios';

import * as reducers from './reducers';

import R from 'ramda';

//import { devTools, persistState } from 'redux-devtools';

import thunk from 'redux-thunk';

import { createStore, compose, combineReducers, applyMiddleware, bindActionCreators } from 'redux';

import * as actions from './actions'

const createHistory = require('history/lib/createHashHistory');

const {syncReduxAndRouter, routeReducer} = require('redux-simple-router');

export const history = createHistory()

export const reducer = combineReducers(Object.assign({}, reducers, {
  routing: routeReducer
}))

const storeFn = compose(
  applyMiddleware(thunk)
//, devTools()
//, persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
);

export const store = storeFn(createStore)(reducer);

syncReduxAndRouter(history, store)

export const bind = (dispatch, creators = actions) => {
  return bindActionCreators(creators, dispatch);
}

export const processResponse = r => {
  if (R.is(Object, r.data)) {
    const {data} = r,
      {errors, messages} = data,
      messagesPresent = Array.isArray(messages) && messages.length,
      errorsPresent = Array.isArray(errors) && errors.length;

    if (errorsPresent) {
      store.dispatch(actions.dumpErrorsFromResponse(errors));
    }

    if (messagesPresent) {
      store.dispatch(actions.dumpMessagesFromResponse(messages));
    }

    return r.data;
  }
  return r;
}

export const request = (() => {
  const instance = axios;

  instance.interceptors.response.use(function(response) {
    return processResponse(response);
  }, function(error) {
    processResponse(error);
    return Promise.reject(error);
  });

  return instance;
})();

window._reducer = reducer;
window._store = store;
window._actions = actions;


export const bounceTime = 300;