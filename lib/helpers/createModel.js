'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _immutable = require('immutable');

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reduxUndo = require('redux-undo');

var _reduxUndo2 = _interopRequireDefault(_reduxUndo);

var _slowUndo = require('./slowUndo');

var _slowUndo2 = _interopRequireDefault(_slowUndo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var actions = {
  setValue: function setValue(field, value, version) {
    return {
      type: 'SET_VALUE',
      data: {
        field: field,
        value: value,
        version: version
      }
    };
  },
  set: function set(newData, version) {
    return {
      type: 'SET',
      data: {
        newData: newData,
        version: version
      }
    };
  }
};

function buildStore(initial) {
  var initialState = new _immutable.OrderedMap(initial);

  var reducer = function reducer() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
    var action = arguments[1];
    var type = action.type;
    var data = action.data;


    switch (type) {
      case "SET_VALUE":
        var newValue = state.set("version", data.version).setIn(data.field.split('.'), data.value);
        return newValue;
      case "SET":
        return new _immutable.OrderedMap(data.newData).set("version", data.version);
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

  var store = (0, _redux.compose)((0, _redux.applyMiddleware)(_reduxThunk2.default))(_redux.createStore)(reducers);

  return store;
}

var Model = function () {
  function Model() {
    var initial = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, Model);

    this.store = buildStore((0, _extends3.default)({}, initial, {
      version: 0
    }));
    this.version = 0;
  }

  Model.prototype.getValue = function getValue(name) {
    var state = this.store.getState();
    if (name) {
      return state.present.getIn(name.split('.'));
    } else {
      return state.present.toJS();
    }
  };

  Model.prototype.onChange = function onChange(name) {
    var before = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
    var store = this.store;


    return function (_ref) {
      var event = _ref.event;
      var target = _ref.target;
      var data = _ref.data;

      this.version = this.version + 1;

      store.dispatch(actions.setValue(name, data, this.version));
    };
  };

  Model.prototype.setValue = function setValue(name, data) {
    this.version = this.version + 1;

    this.store.dispatch(actions.setValue(name, data, this.version));
  };

  Model.prototype.set = function set(data) {
    this.version = this.version + 1;

    this.store.dispatch(actions.set(data, this.version));
  };

  Model.prototype.getVersion = function getVersion() {
    var state = this.store.getState();
    return state.present.get('version');
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
  var initial = arguments.length <= 0 || arguments[0] === undefined ? {
    version: 0
  } : arguments[0];

  return new Model(initial);
};