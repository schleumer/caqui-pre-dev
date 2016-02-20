'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.__esModule = true;

var _redux = require('redux');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO: WHY?
// this might be overkill
// i did on redux to avoid event emitter, since redux footprint
// isn't too whopping
var storeBuilder = function storeBuilder(current) {
  var value = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

  var initialState = {
    current: current,
    displayer: null,
    opened: false,
    value: value
  };

  var actions = {
    setValue: function setValue(data) {
      var opened = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

      return {
        type: 'SET_VALUE',
        data: {
          value: data,
          opened: opened
        }
      };
    },
    open: function open() {
      return {
        type: 'OPEN'
      };
    },
    close: function close() {
      return {
        type: 'CLOSE'
      };
    },
    nextMonth: function nextMonth() {
      return {
        type: 'NEXT_MONTH'
      };
    },
    prevMonth: function prevMonth() {
      return {
        type: 'PREV_MONTH'
      };
    },
    addMinute: function addMinute() {
      return {
        type: 'ADD_MINUTE'
      };
    },
    subMinute: function subMinute() {
      return {
        type: 'SUB_MINUTE'
      };
    },
    addHour: function addHour() {
      return {
        type: 'ADD_HOUR'
      };
    },
    subHour: function subHour() {
      return {
        type: 'SUB_HOUR'
      };
    },
    setMinute: function setMinute(minute) {
      return {
        type: 'SET_MINUTE',
        data: minute
      };
    },
    setHour: function setHour(hour) {
      return {
        type: 'SET_HOUR',
        data: hour
      };
    }
  };

  var reducer = function reducer() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
    var action = arguments[1];
    var type = action.type;
    var data = action.data;

    switch (type) {
      case 'OPEN':
        return (0, _extends3.default)({}, state, {
          opened: true
        });
      case 'CLOSE':
        return (0, _extends3.default)({}, state, {
          opened: false
        });
      case 'PREV_MONTH':
        return (0, _extends3.default)({}, state, {
          current: state.current.clone().subtract(1, 'month')
        });
      case 'NEXT_MONTH':
        return (0, _extends3.default)({}, state, {
          current: state.current.clone().add(1, 'month')
        });
      case 'ADD_HOUR':
        return (0, _extends3.default)({}, state, {
          current: state.current.clone().add(1, 'hour'),
          value: state.current.clone().add(1, 'hour')
        });
      case 'SUB_HOUR':
        return (0, _extends3.default)({}, state, {
          current: state.current.clone().subtract(1, 'hour'),
          value: state.current.clone().subtract(1, 'hour')
        });
      case 'ADD_MINUTE':
        return (0, _extends3.default)({}, state, {
          current: state.current.clone().add(1, 'minute'),
          value: state.current.clone().add(1, 'minute')
        });
      case 'SUB_MINUTE':
        return (0, _extends3.default)({}, state, {
          current: state.current.clone().subtract(1, 'minute'),
          value: state.current.clone().subtract(1, 'minute')
        });
      case 'SET_HOUR':
        return (0, _extends3.default)({}, state, {
          current: state.current.clone().hour(data),
          value: state.current.clone().hour(data)
        });
      case 'SET_MINUTE':
        return (0, _extends3.default)({}, state, {
          current: state.current.clone().minute(data),
          value: state.current.clone().minute(data)
        });
      case 'SET_VALUE':
        return (0, _extends3.default)({}, state, {
          value: data.value ? data.value.clone() : data.value,
          current: data.value ? data.value.clone() : (0, _moment2.default)(),
          opened: data.opened === null ? state.opened : data.opened
        });
      default:
        return state;
    }
  };

  var store = (0, _redux.createStore)(reducer);

  return {
    store: store,
    dispatch: store.dispatch.bind(store),
    subscribe: store.subscribe.bind(store),
    getState: store.getState.bind(store),
    actions: actions
  };
};

exports.default = storeBuilder;