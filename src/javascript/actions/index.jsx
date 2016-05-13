import * as constants from '../constants';
import { request } from '../system';
import * as system from '../system';

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

export * as messages from './messages';