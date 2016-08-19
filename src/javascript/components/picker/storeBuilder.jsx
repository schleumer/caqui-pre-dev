import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const actionsBuilder = (base) => {
  return {
    clear() {
      return {
        type: 'CLEAR'
      }
    },
    showModal() {
      return {
        type: 'SHOW_MODAL'
      }
    },
    hideModal() {
      return {
        type: 'HIDE_MODAL'
      }
    },
    toggleModal() {
      return {
        type: 'TOGGLE_MODAL'
      }
    },
    filter(data) {
      return () => base.filter(data)
    },
    check(item) {
      return {
        type: 'CHECK',
        data: item
      }
    },
    uncheck(item) {
      return {
        type: 'UNCHECK',
        data: item
      }
    },
    baseUpdated(data) {
      return {
        type: 'BASE_UPDATED',
        data
      }
    },
    update(data) {
      return {
        type: 'UPDATE',
        data: data || []
      }
    }
  }
}

const initialState = {
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
}

const storeBuilder = (base, valuedBy, itemKey) => {
  const actions = actionsBuilder(base)

  const itemify = _ => ({
    item: _,
    value: valuedBy(_),
    key: itemKey(_)
  })

  const reducer = (state = initialState, action) => {
    const { type, data } = action

    const getStatus = (filter, data) => {
      // XXX: THIS IS WRONG
      return data.loading ? 'Carregando' : (
        filter
          ? `Filtrado ${data.items.length} de ${data.total}`
          : `Mostrando ${data.items.length} de ${data.total}`
      )
    }

    switch (type) {
      case 'BASE_UPDATED':
        return {
          ...state,
          ...data,
          items: data.items.map(itemify),
          position: 0,
          status: getStatus(data.filter, data)
        }
      case 'CLEAR':
        return {
          ...state,
          selected: null
        }
      case 'FILTER':
        return {
          ...state,
          filter: data,
          status: getStatus(data, state)
        }
      case 'CHECK':
        return {
          ...state,
          checked: [ ...state.checked, data.value ],
          index: [ ...state.index, data.key ]
        }
      case 'UNCHECK':
        return {
          ...state,
          checked: state.checked.filter(item => {
            return itemKey(item) != data.key
          }),
          index: state.index.filter(item => {
            return item != data.key
          })
        }
      case 'UPDATE':
        return {
          ...state,
          checked: data,
          index: data.map(itemKey)
        }
      case 'SHOW_MODAL':
        return {
          ...state,
          isModalVisible: true
        }
      case 'HIDE_MODAL':
        return {
          ...state,
          isModalVisible: false
        }
      case 'TOGGLE_MODAL':
        return {
          ...state,
          isModalVisible: !state.isModalVisible
        }
      default:
        return state
    }

  }

  const store = compose(
    applyMiddleware(thunk)
  )(createStore)(reducer)


  // XXX: forma mais performatica de fazer isso:
  base.subscribe(() => {
    store.dispatch(actions.baseUpdated(base.getState()))
  })

  return {
    store,
    dispatch: store.dispatch.bind(store),
    subscribe: store.subscribe.bind(store),
    getState: store.getState.bind(store),
    touch: base.touch.bind(base),
    check(item) {
      store.dispatch(actions.check(item))
    },
    uncheck(item) {
      store.dispatch(actions.uncheck(item))
    },
    showModal() {
      store.dispatch(actions.showModal())
    },
    hideModal() {
      store.dispatch(actions.hideModal())
    },
    toggleModal() {
      store.dispatch(actions.toggleModal())
    },
    update(value) {
      store.dispatch(actions.update(value))
    },
    firstPage() {
      return base.firstPage();
    },
    goToPage(num) {
      return base.goToPage(num);
    },
    hasFirst() {
      return base.hasFirst();
    },
    hasLast() {
      return base.hasLast();
    },
    hasNext() {
      return base.hasNext();
    },
    hasPrev() {
      return base.hasPrev();
    },
    lastPage() {
      return base.lastPage();
    },
    nextPage() {
      return base.nextPage();
    },
    prevPage() {
      return base.prevPage();
    },
    actions
  }
}

export default storeBuilder
