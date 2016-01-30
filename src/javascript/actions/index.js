import * as constants from '../constants';
import { request } from '../system';
import * as system from '../system';

// TODO: standardize response from APIs
let messageId = 0;
const messageFromResponse = m => {
  if (m.name) {
    m.name = m.field;
  }
  if (!m.id) {
    messageId = messageId + 1;
    m.id = messageId;
  }
  return m;
}

export function dumpMessagesFromResponse(messages) {
  return {
    type: constants.DUMP_MESSAGES_FROM_REQUEST,
    data: messages.map(messageFromResponse)
  }
}

export function dumpErrorsFromResponse(errors) {
  return {
    type: constants.DUMP_ERRORS_FROM_REQUEST,
    data: errors.map(messageFromResponse)
  }
}

export function error(name, message = 'Error', field = 'general') {
  return {
    type: constants.ERROR,
    data: {
      name,
      message,
      field
    }
  }
}

export function forgetError(item) {
  return {
    type: constants.FORGET_ERROR,
    data: item
  }
}

export function message(name, message = 'Error', field = 'general') {
  return {
    type: constants.MESSAGE,
    data: {
      name,
      message,
      field
    }
  }
}

export function forgetMessage(item) {
  return {
    type: constants.FORGET_MESSAGE,
    data: item
  }
}

export function loading(state, message = null, subMessage = null) {
  return {
    type: constants.IS_LOADING,
    data: {
      state,
      message,
      subMessage
    }
  }
}