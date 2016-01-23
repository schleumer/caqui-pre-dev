'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.__esModule = true;

exports.default = function () {
  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
  var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var data = action.data;
  var type = action.type;

  switch (type) {
    case constants.USER_FIRST_FETCH:
      return _extends({}, state, {
        firstFetch: true
      });
    case constants.USER_LOGOUT:
      return _extends({}, state, {
        authenticated: false,
        user: null
      });

    case constants.USER_FETCH_SUCCEEDED:
      return _extends({}, state, {
        authenticated: true,
        user: data
      });

    case constants.TOKEN_DELETE_FAILED:
      return _extends({}, state, {
        authenticated: false
      });

    default:
      return state;
  }
};

var _constants = require('../constants');

var constants = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var initialState = {
  authenticated: false,
  user: null,
  firstFetch: false
};