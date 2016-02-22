import { createStore, compose, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';

const actionsBuilder = (base) => {
  return {
    open() {
      return {
        type: 'OPEN'
      }
    },
    close() {
      return {
        type: 'CLOSE'
      }
    },
    filter(data) {
      return dispatch => {
        base.filter(data);
      }
    //return {
    //  type: 'FILTER',
    //  data
    //}
    },
    down() {
      return {
        type: 'DOWN'
      }
    },
    up() {
      return {
        type: 'UP'
      }
    },
    select(item) {
      return dispatch => {
        dispatch(this.close());

        return dispatch({
          type: 'SELECT',
          data: item
        })
      }
    },
    setCurrentByCursor() {
      return (dispatch, getState) => {
        const state = getState();
        const current = state.items[state.position];

        if (current) {
          dispatch(this.select(current));
        }
      }
    },
    baseUpdated(data) {
      return {
        type: 'BASE_UPDATED',
        data
      }
    }
  }
};

const initialState = {
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

const storeBuilder = (base) => {
  const actions = actionsBuilder(base);

  const reducer = (state = initialState, action) => {
    const {type, data} = action;

    const getStatus = (filter, data) => {
      return data.loading ? 'Carregando' : (
        filter
          ? `Filtrado ${data.items.length} de ${data.total}`
          : `Monstrando ${data.items.length} de ${data.total}`
        )
    }

    switch (type) {
      case 'BASE_UPDATED':
        return {
          ...state,
          items: data.items,
          position: 0,
          loading: data.loading,
          total: data.total,
          filter: data.filter,
          status: getStatus(data.filter, data)
        }
      case 'OPEN':
        return {
          ...state,
          open: true
        }
      case 'CLOSE':
        return {
          ...state,
          open: false
        }
      case 'UP':
        return {
          ...state,
          position: state.position > 0 ? state.position - 1 : state.position
        }
      case 'DOWN':
        return {
          ...state,
          position: state.position < (state.items.length - 1) ? state.position + 1 : state.position
        }
      case 'FILTER':
        return {
          ...state,
          filter: data,
          status: getStatus(data, state)
        }
      case 'SELECT':
        return {
          ...state,
          selected: data
        }
      default:
        return state;
    }

  }

  const store = compose(
    applyMiddleware(thunk)
  )(createStore)(reducer);


  // XXX: forma mais performatica de fazer isso:
  base.subscribe(() => {
    store.dispatch(actions.baseUpdated(base.getState()));
  });

  return {
    store,
    dispatch: store.dispatch.bind(store),
    subscribe: store.subscribe.bind(store),
    getState: store.getState.bind(store),
    actions
  };
}

export default storeBuilder;