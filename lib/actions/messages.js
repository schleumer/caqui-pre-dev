'use strict';

exports.__esModule = true;
exports.error = error;
exports.message = message;
exports.forgetError = forgetError;
exports.forgetMessage = forgetMessage;

var _constants = require('../constants');

var constants = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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

function forgetError(item) {
  return {
    type: constants.FORGET_ERROR,
    data: item
  };
}

function forgetMessage(item) {
  return {
    type: constants.FORGET_MESSAGE,
    data: item
  };
}