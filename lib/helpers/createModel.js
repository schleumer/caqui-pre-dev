'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _immutable = require('immutable');

var _redux = require('redux');

var _reduxUndo = require('redux-undo');

var _reduxUndo2 = _interopRequireDefault(_reduxUndo);

var _slowUndo = require('./slowUndo');

var _slowUndo2 = _interopRequireDefault(_slowUndo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var actions = {
  setValue: function setValue(field, value) {
    return {
      type: 'SET_VALUE',
      data: {
        field: field,
        value: value
      }
    };
  },
  set: function set(newData) {
    return {
      type: 'SET',
      data: newData
    };
  },
  reset: function reset() {
    return {
      type: 'RESET',
      data: null
    };
  }
};

function buildStore(initial) {
  var pastState = new _immutable.OrderedMap(initial);
  var initialState = new _immutable.OrderedMap(initial);

  var reducer = function reducer() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
    var action = arguments[1];
    var type = action.type;
    var data = action.data;


    switch (type) {
      case 'SET_VALUE':
        return state.setIn(data.field.split('.'), data.value);
      case 'SET':
        return new _immutable.OrderedMap(data);
      case 'RESET':
        return new _immutable.OrderedMap(pastState);
      default:
        return state;
    }
  };

  var reducers = (0, _reduxUndo2.default)(reducer, {
    limit: 10,
    initialState: initialState,
    debug: false,
    filter: _slowUndo2.default
  });

  return (0, _redux.createStore)(reducers);
}

var Model = function () {
  function Model() {
    var initial = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, Model);


    this.store = buildStore((0, _extends3.default)({}, initial));
  }

  Model.prototype.getValue = function getValue(name) {
    var state = this.store.getState();
    if (name) {
      return state.present.getIn(name.split('.'));
    } else {
      return state.present.toJS();
    }
  };

  Model.prototype.onChange = function onChange(name /*, before = null*/) {
    var store = this.store;


    return function (_ref) {
      var /* event, target, */data = _ref.data;

      store.dispatch(actions.setValue(name, data));
    };
  };

  Model.prototype.setValue = function setValue(name, data) {
    this.store.dispatch(actions.setValue(name, data));
  };

  Model.prototype.set = function set(data) {
    this.store.dispatch(actions.set(data));
  };

  Model.prototype.reset = function reset() {
    this.store.dispatch(actions.reset());
  };

  Model.prototype.subscribe = function subscribe(fn) {
    return this.store.subscribe(fn);
  };

  Model.prototype.undo = function undo() {
    return this.store.dispatch(_reduxUndo.ActionCreators.undo());
  };

  return Model;
}();

exports.default = function () {
  var initial = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  return new Model(initial);
};