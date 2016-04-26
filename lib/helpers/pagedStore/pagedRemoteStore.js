'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var URLSource = function () {
  function URLSource(source) {
    (0, _classCallCheck3.default)(this, URLSource);

    this.source = source;
  }

  URLSource.prototype.build = function build(query, limit, page) {
    var source = this.source;


    if (source instanceof Function) {
      return source(query || '', limit, page);
    } else {
      return _url2.default.format((0, _assign2.default)({}, _url2.default.parse(source), { query: {
          count: limit,
          page: page,
          q: query
        } }));
    }
  };

  return URLSource;
}();

var m = function m() {
  var a1 = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
  var a2 = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

  if (a1 !== null && a2 !== null) {
    //console.log(a1, a2);
    return a2;
  } else {
    //console.log(a1);
    return a1;
  }
};

var dataStore = function dataStore(_source) {
  var responseFilter = arguments.length <= 1 || arguments[1] === undefined ? function (_) {
    return _;
  } : arguments[1];
  var itemsPerPage = arguments.length <= 2 || arguments[2] === undefined ? 15 : arguments[2];
  var page = arguments.length <= 3 || arguments[3] === undefined ? 1 : arguments[3];

  var source = new URLSource(_source);

  var actions = {
    isLoading: function isLoading() {
      var state = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

      return {
        type: state ? 'IS_LOADING' : 'STOP_LOADING'
      };
    },
    init: function init() {
      return function (dispatch, getState) {
        dispatch(actions.fetchItems());
      };
    },
    fetchItems: function fetchItems() {
      return function (dispatch, getState) {
        var _getState = getState();

        var itemsPerPage = _getState.itemsPerPage;
        var page = _getState.page;
        var filter = _getState.filter;


        dispatch(actions.isLoading());

        _axios2.default.get(source.build(filter, itemsPerPage, page)).then(function (response) {
          var _responseFilter = responseFilter(response);

          var items = _responseFilter.items;
          var total = _responseFilter.total;


          dispatch(actions.setItems(items.slice(0, itemsPerPage), total));
          dispatch(actions.isLoading(false));
        }).catch(function (ex) {
          // we don't treat exception as fatal,
          // those exception may be caused by empty querystrings,
          // or some  "it's ok" error
          dispatch(actions.setItems([], 0));
          dispatch(actions.isLoading(false));
        });
      };
    },
    filter: function filter(data) {
      return function (dispatch) {
        dispatch({
          type: 'FILTER',
          data: data
        });
        dispatch(actions.fetchItems());
      };
    },
    firstPage: function firstPage() {
      return function (dispatch) {
        dispatch({
          type: 'FIRST_PAGE'
        });
        dispatch(actions.fetchItems());
      };
    },
    nextPage: function nextPage() {
      return function (dispatch) {
        dispatch({
          type: 'NEXT_PAGE'
        });
        dispatch(actions.fetchItems());
      };
    },
    prevPage: function prevPage() {
      return function (dispatch) {
        dispatch({
          type: 'PREV_PAGE'
        });
        dispatch(actions.fetchItems());
      };
    },
    lastPage: function lastPage() {
      return function (dispatch) {
        dispatch({
          type: 'LAST_PAGE'
        });
        dispatch(actions.fetchItems());
      };
    },
    goToPage: function goToPage(data) {
      return function (dispatch) {
        dispatch({
          type: 'GO_TO_PAGE',
          data: data
        });
        dispatch(actions.fetchItems());
      };
    },
    setItems: function setItems(items, total) {
      return {
        type: 'SET_ITEMS',
        data: {
          items: items,
          total: total
        }
      };
    }
  };

  var initialState = {
    itemsPerPage: itemsPerPage,
    page: page,
    total: 0,
    totalOfPages: 0,
    filter: null,
    items: []
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

    var data = action.data;
    var type = action.type;


    switch (action.type) {
      case 'FILTER':
        return m("FILTEr", (0, _extends3.default)({}, state, {
          filter: data,
          page: getFirstPage()
        }));
      case 'FIRST_PAGE':
        return m("FIRST_PAGE", (0, _extends3.default)({}, state, {
          page: getFirstPage()
        }));
      case 'LAST_PAGE':
        return m("LAST_PAGE", (0, _extends3.default)({}, state, {
          page: getLastPage()
        }));
      case 'PREV_PAGE':
        return m("PREV_PAGE", (0, _extends3.default)({}, state, {
          page: getPrevPage()
        }));
      case 'NEXT_PAGE':
        return m("NEXT_PAGE", (0, _extends3.default)({}, state, {
          page: getNextPage()
        }));
      case 'GO_TO_PAGE':
        return m("GO_TO_PAGE", (0, _extends3.default)({}, state, {
          page: data
        }));
      case 'SET_ITEMS':
        return m("SET_ITEMS", (0, _extends3.default)({}, state, {
          items: data.items,
          total: data.total,
          totalOfPages: Math.ceil(data.total / state.itemsPerPage)
        }));
      case 'IS_LOADING':
        return m("IS_LOADING", (0, _extends3.default)({}, state, {
          loading: true
        }));
      case 'STOP_LOADING':
        return m("STOP_LOADING", (0, _extends3.default)({}, state, {
          loading: false
        }));

      default:
        return state;
    }
  };

  var store = (0, _redux.compose)((0, _redux.applyMiddleware)(_reduxThunk2.default))(_redux.createStore)(reducer);

  store.dispatch(actions.init());

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
    goToPage: function goToPage(num) {
      return function () {
        store.dispatch(actions.goToPage(num));
      };
    },
    getState: function getState() {
      return store.getState();
    },
    subscribe: function subscribe(fn) {
      return store.subscribe(fn);
    },
    hasFirst: function hasFirst() {
      var state = store.getState();

      return state.page != 1;
    },
    hasPrev: function hasPrev() {
      var state = store.getState();
      return state.page > 1;
    },
    hasNext: function hasNext() {
      var state = store.getState();
      return state.page < state.totalOfPages;
    },
    hasLast: function hasLast() {
      var state = store.getState();
      return state.totalOfPages > 1 && state.page != state.totalOfPages;
    },
    filter: function filter(query) {
      store.dispatch(actions.filter(query));
    }
  };
};

exports.default = dataStore;