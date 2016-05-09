import Promise from 'bluebird';

import {createStore, compose, applyMiddleware} from 'redux';

import thunk from 'redux-thunk';

import axios from 'axios';

import url from 'url';

class URLSource {
    constructor(source) {
        this.source = source;
    }

    build(query, limit, page) {
        const {source} = this;

        if (source instanceof Function) {
            return source(query || '', limit, page);
        } else {
            return url.format(Object.assign({}, url.parse(source), {
                query: {
                    count: limit,
                    page,
                    q: query
                }
            }))
        }
    }
}

const m = (a1 = null, a2 = null) => {
    if (a1 !== null && a2 !== null) {
        //console.log(a1, a2);
        return a2;
    } else {
        //console.log(a1);
        return a1;
    }
}

const dataStore = (_source, responseFilter = _ => _, itemsPerPage = 15, page = 1) => {
    const source = new URLSource(_source);

    const actions = {
        isLoading(state = true) {
            return {
                type: state ? 'IS_LOADING' : 'STOP_LOADING'
            };
        },
        init() {
            return (dispatch, getState) => {
                //dispatch(actions.fetchItems());
            }
        },
        fetchItems() {
            return (dispatch, getState) => {
                const {itemsPerPage, page, filter} = getState();

                dispatch(actions.isLoading());

                return axios.get(source.build(filter, itemsPerPage, page)).then((response) => {
                    const {items, total} = responseFilter(response);

                    dispatch(actions.setItems(items.slice(0, itemsPerPage), total));
                    dispatch(actions.isLoading(false));
                }).catch((ex) => {
                    // we don't treat exception as fatal,
                    // those exception may be caused by empty querystrings,
                    // or some  "it's ok" error
                    dispatch(actions.setItems([], 0));
                    dispatch(actions.isLoading(false));
                });
            }
        },
        filter(data) {
            return dispatch => {
                dispatch({
                    type: 'FILTER',
                    data
                });
                return dispatch(actions.fetchItems());
            }
        },
        firstPage() {
            return dispatch => {
                dispatch({
                    type: 'FIRST_PAGE'
                });
                return dispatch(actions.fetchItems());
            }
        },
        nextPage() {
            return dispatch => {
                dispatch({
                    type: 'NEXT_PAGE'
                });
                return dispatch(actions.fetchItems());
            }
        },
        prevPage() {
            return dispatch => {
                dispatch({
                    type: 'PREV_PAGE'
                });
                return dispatch(actions.fetchItems());
            }
        },
        lastPage() {
            return dispatch => {
                dispatch({
                    type: 'LAST_PAGE'
                });
                return dispatch(actions.fetchItems());
            }
        },
        goToPage(data) {
            return dispatch => {
                dispatch({
                    type: 'GO_TO_PAGE',
                    data
                });
                return dispatch(actions.fetchItems());
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
        },
        setQuery(query) {
            return {
                type: 'SET_QUERY',
                data: query
            }
        },
        setQueryAndFetch(query) {
            return (dispatch, getState) => {
                const {itemsPerPage, page, filter} = getState();
                dispatch({
                    type: 'SET_QUERY',
                    data: query
                });
                if (query.limit != itemsPerPage || query.page != page || query.query != filter) {
                    return dispatch(actions.fetchItems());
                } else {
                    return Promise.resolve();
                }
            };
        },
        touch() {
            return dispatch => {
                dispatch({
                    type: 'TOUCH',
                    data: {}
                });
                return dispatch(actions.fetchItems());
            }
        }
    };


    const initialState = {
        itemsPerPage,
        page,
        total: 0,
        totalOfPages: 0,
        filter: null,
        touched: false,
        items: []
    };

    const reducer = (state = initialState, action) => {
        const getFirstPage = () => {
            return 1;
        };

        const getTotalOfPages = () => {
            return Math.ceil(state.total / state.itemsPerPage);
        };

        const getCurrentPage = () => {
            return state.page;
        };

        const getLastPage = getTotalOfPages;

        const getNextPage = () => {
            if (getCurrentPage() + 1 <= getTotalOfPages()) {
                return state.page + 1;
            } else {
                return state.page;
            }
        };

        const getPrevPage = () => {
            if (getCurrentPage() - 1 >= 1) {
                return state.page - 1;
            } else {
                return state.page;
            }
        };

        const getCurrentOffset = (page = getCurrentPage()) => {
            return (page - 1) * state.itemsPerPage;
        };

        const getCurrentOffsetLimit = (page) => {
            return getCurrentOffset(page) + state.itemsPerPage;
        };

        const getItemsOnPage = (page = getCurrentPage()) => {
            return data.slice(getCurrentOffset(page), getCurrentOffsetLimit(page));
        };

        const {data, type} = action;

        switch (action.type) {
            case 'FILTER':
                return m("FILTEr", {
                    ...state,
                    filter: data,
                    page: getFirstPage()
                });
            case 'FIRST_PAGE':
                return m("FIRST_PAGE", {
                    ...state,
                    page: getFirstPage()
                });
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
                });
            case 'SET_QUERY':
                return m('SET_QUERY', {
                    ...state,
                    itemsPerPage: parseInt(data.limit || state.itemsPerPage),
                    page: parseInt(data.page || state.page),
                    filter: data.query || state.filter
                });
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
            case 'TOUCH':
                return m("STOP_LOADING", {
                    ...state,
                    touched: true
                });
            default:
                return state
        }
    };

    const store = compose(
        applyMiddleware(thunk)
    )(createStore)(reducer);

    store.dispatch(actions.init());

    return {
        store,
        actions,
        nextPage() {
            return store.dispatch(actions.nextPage());
        },
        prevPage() {
            return store.dispatch(actions.prevPage());
        },
        firstPage() {
            return store.dispatch(actions.firstPage());
        },
        lastPage() {
            return store.dispatch(actions.lastPage());
        },
        goToPage(num) {
            return store.dispatch(actions.goToPage(num));
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
            return store.dispatch(actions.filter(query));
        },
        touch() {
            return store.dispatch(actions.touch());
        },
        setQuery(query) {
            return store.dispatch(actions.setQuery(query));
        },
        setQueryAndFetch(query) {
            return store.dispatch(actions.setQueryAndFetch(query));
        }
    };
};

export default dataStore;