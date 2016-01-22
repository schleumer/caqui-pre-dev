import axios from 'axios';

import * as reducers from './reducers';

import { 
  createStore,
  compose,
  combineReducers,
  applyMiddleware,
  bindActionCreators
} from 'redux';

import thunk from 'redux-thunk';

import * as actions from './actions';

import { is } from './helpers';

export const reducer = combineReducers(reducers)

const storeFn = compose(applyMiddleware(thunk));

export const store = storeFn(createStore)(reducer);

export const bind = (dispatch, creators = actions) => {
  return bindActionCreators(creators, dispatch);
}

export const processResponse = result => {
  if (is(Object, result.data)) {
    const {data} = result,
      {errors, messages} = data,
      messagesPresent = Array.isArray(messages) && messages.length,
      errorsPresent = Array.isArray(errors) && errors.length;

    if (errorsPresent) {
      store.dispatch(actions.dumpErrorsFromResponse(errors));
    }

    if (messagesPresent) {
      store.dispatch(actions.dumpMessagesFromResponse(messages));
    }

    return result.data;
  }

  return result;
}

export const request = (() => {
  const instance = axios;

  instance.interceptors.response.use((response) => {
    return processResponse(response);
  }, (error) => {
    processResponse(error);
    return Promise.reject(error);
  });

  return instance;
})();

export const bounceTime = 300;