'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var actionsBuilder = function actionsBuilder(base) {
  return {
    clear: function clear() {
      return {
        type: 'CLEAR'
      };
    },
    filter: function filter(data) {
      return function () {
        return base.filter(data);
      };
    },
    check: function check(item) {
      return {
        type: 'CHECK',
        data: item
      };
    },
    uncheck: function uncheck(item) {
      return {
        type: 'UNCHECK',
        data: item
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
  checked: [],
  index: [],
  total: 0,
  position: null,
  filter: null,
  opened: false,
  modal: false,
  loading: false,
  status: 'Carregando...'
};

var storeBuilder = function storeBuilder(base, valuedBy, itemKey) {
  var actions = actionsBuilder(base);

  var itemify = function itemify(_) {
    return {
      item: _,
      value: valuedBy(_),
      key: itemKey(_)
    };
  };

  var reducer = function reducer() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
    var action = arguments[1];
    var type = action.type;
    var data = action.data;


    var getStatus = function getStatus(filter, data) {
      // XXX: THIS IS WRONG
      return data.loading ? 'Carregando' : filter ? 'Filtrado ' + data.items.length + ' de ' + data.total : 'Mostrando ' + data.items.length + ' de ' + data.total;
    };

    switch (type) {
      case 'BASE_UPDATED':
        return (0, _extends3.default)({}, state, {
          items: data.items.map(itemify),
          position: 0,
          loading: data.loading,
          total: data.total,
          filter: data.filter,
          status: getStatus(data.filter, data)
        });
      case 'CLEAR':
        return (0, _extends3.default)({}, state, {
          selected: null
        });
      case 'FILTER':
        return (0, _extends3.default)({}, state, {
          filter: data,
          status: getStatus(data, state)
        });
      case 'CHECK':
        return (0, _extends3.default)({}, state, {
          checked: [].concat(state.checked, [data.value]),
          index: [].concat(state.index, [data.key])
        });
      case 'UNCHECK':
        return (0, _extends3.default)({}, state, {
          checked: state.checked.filter(function (item) {
            return itemKey(item) != data.key;
          }),
          index: state.index.filter(function (item) {
            return item != data.key;
          })
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
    touch: base.touch.bind(base),
    check: function check(item) {
      store.dispatch(actions.check(item));
    },
    uncheck: function uncheck(item) {
      store.dispatch(actions.uncheck(item));
    },

    actions: actions
  };
};

exports.default = storeBuilder;