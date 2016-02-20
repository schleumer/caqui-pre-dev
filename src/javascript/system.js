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

// THIS IS WRONG, THIS IS SO WRONG
// https://www.youtube.com/v/bW8FbKswSRU&start=101&end=128
// TODO: Another way to do this!
const iconsFile = require('./icons.js');
const body = document.getElementsByTagName("body")[0];
const iconsElement = document.createElement("div");
iconsElement.style.display = "none";
iconsElement.innerHTML = iconsFile;
body.appendChild(iconsElement);

export const reducer = combineReducers(reducers)

const storeFn = compose(applyMiddleware(thunk));

export const store = storeFn(createStore)(reducer);

export const bind = (dispatch, creators = actions) => {
  return bindActionCreators(creators, dispatch);
}

export const processResponse = result => {
  if (is(Object, result.data)) {
    const { data } = result;
    
    //   {errors, messages} = data,
    //   messagesPresent = Array.isArray(messages) && messages.length,
    //   errorsPresent = Array.isArray(errors) && errors.length;

    // if (errorsPresent) {
    //   store.dispatch(actions.dumpErrorsFromResponse(errors));
    // }

    // if (messagesPresent) {
    //   store.dispatch(actions.dumpMessagesFromResponse(messages));
    // }

    return data;
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

export const m = (...args) =>
  args.reduce((left, right) =>
    right 
      ? Object.assign({}, left, right) 
      : left
  , {});