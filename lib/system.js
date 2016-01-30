'use strict';

exports.__esModule = true;
exports.m = exports.bounceTime = exports.request = exports.processResponse = exports.bind = exports.store = exports.reducer = undefined;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _reducers = require('./reducers');

var reducers = _interopRequireWildcard(_reducers);

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _actions = require('./actions');

var actions = _interopRequireWildcard(_actions);

var _helpers = require('./helpers');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// THIS IS WRONG, THIS IS SO WRONG
// TODO: Another way to do this!
var iconsFile = require('./icons.svg');
var body = document.getElementsByTagName("body")[0];
var iconsElement = document.createElement("div");
iconsElement.style.display = "none";
iconsElement.innerHTML = iconsFile;
body.appendChild(iconsElement);

var reducer = exports.reducer = (0, _redux.combineReducers)(reducers);

var storeFn = (0, _redux.compose)((0, _redux.applyMiddleware)(_reduxThunk2.default));

var store = exports.store = storeFn(_redux.createStore)(reducer);

var bind = exports.bind = function bind(dispatch) {
  var creators = arguments.length <= 1 || arguments[1] === undefined ? actions : arguments[1];

  return (0, _redux.bindActionCreators)(creators, dispatch);
};

var processResponse = exports.processResponse = function processResponse(result) {
  if ((0, _helpers.is)(Object, result.data)) {
    var data = result.data;

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
};

var request = exports.request = function () {
  var instance = _axios2.default;

  instance.interceptors.response.use(function (response) {
    return processResponse(response);
  }, function (error) {
    processResponse(error);
    return Promise.reject(error);
  });

  return instance;
}();

var bounceTime = exports.bounceTime = 300;

var m = exports.m = function m() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return args.reduce(function (left, right) {
    return right ? Object.assign({}, left, right) : left;
  }, {});
};