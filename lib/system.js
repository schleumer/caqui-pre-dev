'use strict';

exports.__esModule = true;
exports.m = exports.bounceTime = exports.request = exports.bind = exports.reducer = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _reducers = require('./reducers');

var reducers = _interopRequireWildcard(_reducers);

var _redux = require('redux');

var _actions = require('./actions');

var actions = _interopRequireWildcard(_actions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// THIS IS WRONG, THIS IS SO WRONG
// https://www.youtube.com/v/bW8FbKswSRU&start=101&end=128
// TODO: Another way to do this!
var iconsFile = require('./icons');
var body = document.getElementsByTagName('body')[0];
var iconsElement = document.createElement('div');
iconsElement.style.display = 'none';
iconsElement.innerHTML = iconsFile;
body.appendChild(iconsElement);

var reducer = exports.reducer = (0, _redux.combineReducers)(reducers);

var bind = exports.bind = function bind(dispatch) {
  var creators = arguments.length <= 1 || arguments[1] === undefined ? actions : arguments[1];

  return (0, _redux.bindActionCreators)(creators, dispatch);
};

var request = exports.request = function () {
  var instance = _axios2.default.create();

  instance.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    return _promise2.default.reject(error);
  });

  return instance;
}();

var bounceTime = exports.bounceTime = 300;

var m = exports.m = function m() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return args.reduce(function (left, right) {
    return right ? (0, _assign2.default)({}, left, right) : left;
  }, {});
};

//window._store = store
//window._actions = actions