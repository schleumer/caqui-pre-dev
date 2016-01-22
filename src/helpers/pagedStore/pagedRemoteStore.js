import Promise from 'bluebird';

import { createStore, compose, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';

import axios from 'axios';

import resultHasErrors from '../resultHasErrors';

const actions = {
  isLoading(state = true) {
    return {
      type: state ? 'IS_LOADING' : 'STOP_LOADING'
    };
  },
  init() {
    return (dispatch, getState) => {
      dispatch(actions.fetchItems());
    }
  },
  fetchItems() {
    return (dispatch, getState) => {
      const {source, itemsPerPage, page, filter} = getState();

      dispatch(actions.isLoading());

      axios.get(source, {
        params: {
          count: itemsPerPage,
          page,
          q: filter
        }
      }).then((response) => {
        if (!resultHasErrors(response)) {
          const {parcel: {total, result}} = response;
          dispatch(actions.setItems(result, total));

          dispatch(actions.isLoading(false));
        }
      });
    }
  },
  filter(data) {
    return dispatch => {
      dispatch({
        type: 'FILTER',
        data
      });
      dispatch(actions.fetchItems());
    }
  },
  firstPage() {
    return dispatch => {
      dispatch({
        type: 'FIRST_PAGE'
      });
      dispatch(actions.fetchItems());
    }
  },
  nextPage() {
    return dispatch => {
      dispatch({
        type: 'NEXT_PAGE'
      });
      dispatch(actions.fetchItems());
    }
  },
  prevPage() {
    return dispatch => {
      dispatch({
        type: 'PREV_PAGE'
      });
      dispatch(actions.fetchItems());
    }
  },
  lastPage() {
    return dispatch => {
      dispatch({
        type: 'LAST_PAGE'
      });
      dispatch(actions.fetchItems());
    }
  },
  goToPage(data) {
    return dispatch => {
      dispatch({
        type: 'GO_TO_PAGE',
        data
      });
      dispatch(actions.fetchItems());
    }
  },
  setItems(items, total) {
    return {
      type: 'SET_ITEMS',
      data: {
        items,
        total
      }
    }
  }
};

const m = (a1 = null, a2 = null) => {
  if (a1 !== null && a2 !== null) {
    //console.log(a1, a2);
    return a2;
  } else {
    //console.log(a1);
    return a1;
  }
}

const dataStore = (source, itemsPerPage = 15, page = 1) => {
  const initialState = {
    source,
    itemsPerPage,
    page,
    total: 0,
    totalOfPages: 0,
    filter: null,
    items: [],
  };

  const reducer = (state = initialState, action) => {
    const getFirstPage = () => {
      return 1;
    }

    const getTotalOfPages = () => {
      return Math.ceil(state.total / state.itemsPerPage);
    }

    const getCurrentPage = () => {
      return state.page;
    }

    const getLastPage = getTotalOfPages;

    const getNextPage = () => {
      if (getCurrentPage() + 1 <= getTotalOfPages()) {
        return state.page + 1;
      } else {
        return state.page;
      }
    }

    const getPrevPage = () => {
      if (getCurrentPage() - 1 >= 1) {
        return state.page - 1;
      } else {
        return state.page;
      }
    }

    const getCurrentOffset = (page = getCurrentPage()) => {
      return (page - 1) * state.itemsPerPage;
    }

    const getCurrentOffsetLimit = (page) => {
      return getCurrentOffset(page) + state.itemsPerPage;
    }

    const getItemsOnPage = (page = getCurrentPage()) => {
      return data.slice(getCurrentOffset(page), getCurrentOffsetLimit(page));
    }

    const {data, type} = action;

    switch (action.type) {
      case 'FILTER':
        return m("FILTEr", {
          ...state,
          filter: data
        });
      case 'FIRST_PAGE':
        return m("FIRST_PAGE", {
          ...state,
          page: getFirstPage()
        })
      case 'LAST_PAGE':
        return m("LAST_PAGE", {
          ...state,
          page: getLastPage()
        });
      case 'PREV_PAGE':
        return m("PREV_PAGE", {
          ...state,
          page: getPrevPage()
        });
      case 'NEXT_PAGE':
        return m("NEXT_PAGE", {
          ...state,
          page: getNextPage()
        });
      case 'GO_TO_PAGE':
        return m("GO_TO_PAGE", {
          ...state,
          page: data
        });
      case 'SET_ITEMS':
        return m("SET_ITEMS", {
          ...state,
          items: data.items,
          total: data.total,
          totalOfPages: Math.ceil(data.total / state.itemsPerPage)
        })
      case 'IS_LOADING':
        return m("IS_LOADING", {
          ...state,
          loading: true
        });
      case 'STOP_LOADING':
        return m("STOP_LOADING", {
          ...state,
          loading: false
        });

      default: return state
    }
  }

  const store = compose(
    applyMiddleware(thunk)
  )(createStore)(reducer);

  store.dispatch(actions.init());

  return {
    store,
    actions,
    nextPage() {
      store.dispatch(actions.nextPage());
    },
    prevPage() {
      store.dispatch(actions.prevPage());
    },
    firstPage() {
      store.dispatch(actions.firstPage());
    },
    lastPage() {
      store.dispatch(actions.lastPage());
    },
    goToPage(num) {
      return () => {
        store.dispatch(actions.goToPage(num));
      }
    },
    getState() {
      return store.getState();
    },
    subscribe(fn) {
      return store.subscribe(fn);
    },
    hasFirst() {
      const state = store.getState();

      return state.page != 1;
    },
    hasPrev() {
      const state = store.getState();
      return state.page > 1;
    },
    hasNext() {
      const state = store.getState();
      return state.page < state.totalOfPages;
    },
    hasLast() {
      const state = store.getState();
      return state.totalOfPages > 1 && state.page != state.totalOfPages;
    },
    filter(query) {
      store.dispatch(actions.filter(query));
    }
  };
}

export default dataStore;