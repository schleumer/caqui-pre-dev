import * as constants from '../constants';
import {m} from '../system';

let messageId = 0;

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

export function forgetError(item) {
  return {
    type: constants.FORGET_ERROR,
    data: item
  }
}

export function forgetMessage(item) {
  return {
    type: constants.FORGET_MESSAGE,
    data: item
  }
}