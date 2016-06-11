import * as constants from '../constants'

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
