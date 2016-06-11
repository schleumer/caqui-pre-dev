'use strict';

exports.__esModule = true;
exports.messages = undefined;
exports.loading = loading;

var _constants = require('../constants');

var constants = _interopRequireWildcard(_constants);

var _messages2 = require('./messages');

var _messages = _interopRequireWildcard(_messages2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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

exports.messages = _messages;