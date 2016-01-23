'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.__esModule = true;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var actions = {
  firstPage: function firstPage() {
    return {
      type: 'FIRST_PAGE'
    };
  },
  nextPage: function nextPage() {
    return {
      type: 'NEXT_PAGE'
    };
  },
  prevPage: function prevPage() {
    return {
      type: 'PREV_PAGE'
    };
  },
  lastPage: function lastPage() {
    return {
      type: 'LAST_PAGE'
    };
  }
};

var m = function m() {
  var a1 = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
  var a2 = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

  if (a1 !== null && a2 !== null) {
    console.log(a1, a2);
    return a2;
  } else {
    console.log(a1);
    return a1;
  }
};

var dataStore = function dataStore(data, total) {
  var itemsPerPage = arguments.length <= 2 || arguments[2] === undefined ? 15 : arguments[2];
  var page = arguments.length <= 3 || arguments[3] === undefined ? 1 : arguments[3];

  var initialState = {
    itemsPerPage: itemsPerPage,
    page: page,
    total: total,
    items: [],
    loading: false
  };

  var reducer = function reducer() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
    var action = arguments[1];

    var getFirstPage = function getFirstPage() {
      return 1;
    };

    var getTotalOfPages = function getTotalOfPages() {
      return Math.ceil(state.total / state.itemsPerPage);
    };

    var getCurrentPage = function getCurrentPage() {
      return state.page;
    };

    var getLastPage = getTotalOfPages;

    var getNextPage = function getNextPage() {
      if (getCurrentPage() + 1 <= getTotalOfPages()) {
        return state.page + 1;
      } else {
        return state.page;
      }
    };

    var getPrevPage = function getPrevPage() {
      if (getCurrentPage() - 1 >= 1) {
        return state.page - 1;
      } else {
        return state.page;
      }
    };

    var getCurrentOffset = function getCurrentOffset() {
      var page = arguments.length <= 0 || arguments[0] === undefined ? getCurrentPage() : arguments[0];

      return (page - 1) * state.itemsPerPage;
    };

    var getCurrentOffsetLimit = function getCurrentOffsetLimit(page) {
      return getCurrentOffset(page) + state.itemsPerPage;
    };

    var getItemsOnPage = function getItemsOnPage() {
      var page = arguments.length <= 0 || arguments[0] === undefined ? getCurrentPage() : arguments[0];

      return data.slice(getCurrentOffset(page), getCurrentOffsetLimit(page));
    };

    switch (action.type) {
      case 'FIRST_PAGE':
        return m("FIRST_PAGE", _extends({}, state, {
          page: getFirstPage(),
          items: getItemsOnPage(getFirstPage())
        }));
      case 'LAST_PAGE':
        return m("LAST_PAGE", _extends({}, state, {
          page: getLastPage(),
          items: getItemsOnPage(getLastPage())
        }));
      case 'PREV_PAGE':
        return m("PREV_PAGE", _extends({}, state, {
          page: getPrevPage(),
          items: getItemsOnPage(getPrevPage())
        }));
      case 'NEXT_PAGE':
        return m("NEXT_PAGE", _extends({}, state, {
          page: getNextPage(),
          items: getItemsOnPage(getNextPage())
        }));
      case 'IS_LOADING':
        return m("IS_LOADING", _extends({}, state, {
          loading: true
        }));
      case 'STOP_LOADING':
        return m("STOP_LOADING", _extends({}, state, {
          loading: false
        }));
      default:
        return state;
    }
  };

  var store = (0, _redux.compose)((0, _redux.applyMiddleware)(_reduxThunk2.default))(_redux.createStore)(reducer);

  return {
    store: store,
    actions: actions,
    nextPage: function nextPage() {
      store.dispatch(actions.nextPage());
    },
    prevPage: function prevPage() {
      store.dispatch(actions.prevPage());
    },
    firstPage: function firstPage() {
      store.dispatch(actions.firstPage());
    },
    lastPage: function lastPage() {
      store.dispatch(actions.lastPage());
    },
    getState: function getState() {
      return store.getState();
    }
  };
};

exports.default = dataStore;