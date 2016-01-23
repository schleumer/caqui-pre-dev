'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.__esModule = true;

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var actionsBuilder = function actionsBuilder(base) {
  return {
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
    filter: function filter(data) {
      return function (dispatch) {
        base.filter(data);
      };
      //return {
      //  type: 'FILTER',
      //  data
      //}
    },
    down: function down() {
      return {
        type: 'DOWN'
      };
    },
    up: function up() {
      return {
        type: 'UP'
      };
    },
    select: function select(item) {
      var _this = this;

      return function (dispatch) {
        dispatch(_this.close());

        return dispatch({
          type: 'SELECT',
          data: item
        });
      };
    },
    setCurrentByCursor: function setCurrentByCursor() {
      var _this2 = this;

      return function (dispatch, getState) {
        var state = getState();
        var current = state.items[state.position];

        if (current) {
          dispatch(_this2.select(current));
        }
      };
    },
    baseUpdated: function baseUpdated(data) {
      return {
        type: 'BASE_UPDATED',
        data: data
      };
    }
  };
};

var initialState = {
  items: [],
  total: 0,
  position: null,
  filter: null,
  opened: false,
  modal: false,
  loading: false,
  status: 'Carregando...',
  selected: null
};

var storeBuilder = function storeBuilder(base) {
  var actions = actionsBuilder(base);

  var reducer = function reducer() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
    var action = arguments[1];
    var type = action.type;
    var data = action.data;

    var getStatus = function getStatus(filter, data) {
      return data.loading ? 'Carregando' : filter ? 'Filtrado ' + data.items.length + ' de ' + data.total : 'Monstrando ' + data.items.length + ' de ' + data.total;
    };

    switch (type) {
      case 'BASE_UPDATED':
        return _extends({}, state, {
          items: data.items,
          position: 0,
          loading: data.loading,
          total: data.total,
          filter: data.filter,
          status: getStatus(data.filter, data)
        });
      case 'OPEN':
        return _extends({}, state, {
          open: true
        });
      case 'CLOSE':
        return _extends({}, state, {
          open: false
        });
      case 'UP':
        return _extends({}, state, {
          position: state.position > 0 ? state.position - 1 : state.position
        });
      case 'DOWN':
        return _extends({}, state, {
          position: state.position < state.items.length - 1 ? state.position + 1 : state.position
        });
      case 'FILTER':
        return _extends({}, state, {
          filter: data,
          status: getStatus(data, state)
        });
      case 'SELECT':
        return _extends({}, state, {
          selected: data
        });
      default:
        return state;
    }
  };

  var store = (0, _redux.compose)((0, _redux.applyMiddleware)(_reduxThunk2.default))(_redux.createStore)(reducer);

  // XXX: forma mais performatica de fazer isso:
  base.subscribe(function () {
    store.dispatch(actions.baseUpdated(base.getState()));
  });

  return {
    store: store,
    dispatch: store.dispatch.bind(store),
    subscribe: store.subscribe.bind(store),
    getState: store.getState.bind(store),
    actions: actions
  };
};

exports.default = storeBuilder;