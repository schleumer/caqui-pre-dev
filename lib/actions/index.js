'use strict';

exports.__esModule = true;
exports.dumpMessagesFromResponse = dumpMessagesFromResponse;
exports.dumpErrorsFromResponse = dumpErrorsFromResponse;
exports.error = error;
exports.forgetError = forgetError;
exports.message = message;
exports.forgetMessage = forgetMessage;
exports.loading = loading;

var _constants = require('../constants');

var constants = _interopRequireWildcard(_constants);

var _system = require('../system');

var system = _interopRequireWildcard(_system);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// TODO: standardize response from APIs
var messageId = 0;
var messageFromResponse = function messageFromResponse(m) {
  if (m.name) {
    m.name = m.field;
  }
  if (!m.id) {
    messageId = messageId + 1;
    m.id = messageId;
  }
  return m;
};

function dumpMessagesFromResponse(messages) {
  return {
    type: constants.DUMP_MESSAGES_FROM_REQUEST,
    data: messages.map(messageFromResponse)
  };
}

function dumpErrorsFromResponse(errors) {
  return {
    type: constants.DUMP_ERRORS_FROM_REQUEST,
    data: errors.map(messageFromResponse)
  };
}

function error(name) {
  var message = arguments.length <= 1 || arguments[1] === undefined ? 'Error' : arguments[1];
  var field = arguments.length <= 2 || arguments[2] === undefined ? 'general' : arguments[2];

  return {
    type: constants.ERROR,
    data: {
      name: name,
      message: message,
      field: field
    }
  };
}

function forgetError(item) {
  return {
    type: constants.FORGET_ERROR,
    data: item
  };
}

function message(name) {
  var message = arguments.length <= 1 || arguments[1] === undefined ? 'Error' : arguments[1];
  var field = arguments.length <= 2 || arguments[2] === undefined ? 'general' : arguments[2];

  return {
    type: constants.MESSAGE,
    data: {
      name: name,
      message: message,
      field: field
    }
  };
}

function forgetMessage(item) {
  return {
    type: constants.FORGET_MESSAGE,
    data: item
  };
}

function loading(state) {
  var message = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
  var subMessage = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

  return {
    type: constants.IS_LOADING,
    data: {
      state: state,
      message: message,
      subMessage: subMessage
    }
  };
}