import Promise from 'bluebird';

import {createStore, compose, applyMiddleware} from 'redux';

import thunk from 'redux-thunk';

const actions = {
    isLoading(state = true) {
        return {
            type: state ? 'IS_LOADING' : 'STOP_LOADING'
        };
    },
    init() {
        return {
            type: 'INIT'
        }
    },
    firstPage() {
        return {
            type: 'FIRST_PAGE'
        }
    },
    nextPage() {
        return {
            type: 'NEXT_PAGE'
        }
    },
    prevPage() {
        return {
            type: 'PREV_PAGE'
        }
    },
    lastPage() {
        return {
            type: 'LAST_PAGE'
        }
    },
    filter(query) {
        return {
            type: 'FILTER',
            data: query
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

const dataStore = (data, userOptions = {}, itemsPerPage = 15, page = 1) => {
    const options = {
        getLabel: _ => _.name,
        getKey: _ => _.id,
        ...userOptions
    };

    const initialState = {
        itemsPerPage,
        page,
        total: data.length,
        items: data,
        loading: false
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

        const filterItems = (query) => {
            return data.filter((item) => options.getLabel(item).indexOf(query) > -1)
        }

        switch (action.type) {
            case 'FIRST_PAGE':
                return m("FIRST_PAGE", {
                    ...state,
                    page: getFirstPage(),
                    items: getItemsOnPage(getFirstPage())
                })
            case 'LAST_PAGE':
                return m("LAST_PAGE", {
                    ...state,
                    page: getLastPage(),
                    items: getItemsOnPage(getLastPage())
                });
            case 'PREV_PAGE':
                return m("PREV_PAGE", {
                    ...state,
                    page: getPrevPage(),
                    items: getItemsOnPage(getPrevPage())
                });
            case 'NEXT_PAGE':
                return m("NEXT_PAGE", {
                    ...state,
                    page: getNextPage(),
                    items: getItemsOnPage(getNextPage())
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
            case 'FILTER':
                return m("FILTER", {
                    ...state,
                    filter: action.data,
                    items: filterItems(action.data)
                });
            default:
                return state
        }
    }

    const store = compose(
        applyMiddleware(thunk)
    )(createStore)(reducer);

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
            return store.dispatch(actions.init());
        },
        setQuery(query) {
            return store.dispatch(actions.setQuery(query));
        },
        setQueryAndFetch(query) {
            return store.dispatch(actions.setQuery(query));
        }
    };
}

export default dataStore;
