import { createStore } from 'redux'
import moment from 'moment'

// TODO: WHY?
// this might be overkill
// i did on redux to avoid event emitter, since redux footprint
// isn't too whopping
const storeBuilder = (current, value = null) => {
  const initialState = {
    current,
    displayer: null,
    opened: false,
    value
  }

  const actions = {
    setValue(data, opened = null) {
      return {
        type: 'SET_VALUE',
        data: {
          value: data,
          opened
        }
      }
    },
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
    nextMonth() {
      return {
        type: 'NEXT_MONTH'
      }
    },
    prevMonth() {
      return {
        type: 'PREV_MONTH'
      }
    },
    addMinute() {
      return {
        type: 'ADD_MINUTE'
      }
    },
    subMinute() {
      return {
        type: 'SUB_MINUTE'
      }
    },
    addHour() {
      return {
        type: 'ADD_HOUR'
      }
    },
    subHour() {
      return {
        type: 'SUB_HOUR'
      }
    },
    setMinute(minute) {
      return {
        type: 'SET_MINUTE',
        data: minute
      }
    },
    setHour(hour) {
      return {
        type: 'SET_HOUR',
        data: hour
      }
    }
  }

  const reducer = (state = initialState, action) => {
    const { type, data } = action


    switch (type) {
      case 'OPEN':
        return {
          ...state,
          opened: true
        }
      case 'CLOSE':
        return {
          ...state,
          opened: false
        }
      case 'PREV_MONTH':
        return {
          ...state,
          current: state.current.clone().subtract(1, 'month')
        }
      case 'NEXT_MONTH':
        return {
          ...state,
          current: state.current.clone().add(1, 'month')
        }
      case 'ADD_HOUR':
        return {
          ...state,
          current: state.current.clone().add(1, 'hour'),
          value: state.current.clone().add(1, 'hour')
        }
      case 'SUB_HOUR':
        return {
          ...state,
          current: state.current.clone().subtract(1, 'hour'),
          value: state.current.clone().subtract(1, 'hour')
        }
      case 'ADD_MINUTE':
        return {
          ...state,
          current: state.current.clone().add(1, 'minute'),
          value: state.current.clone().add(1, 'minute')
        }
      case 'SUB_MINUTE':
        return {
          ...state,
          current: state.current.clone().subtract(1, 'minute'),
          value: state.current.clone().subtract(1, 'minute')
        }
      case 'SET_HOUR':
        return {
          ...state,
          current: state.current.clone().hour(data),
          value: state.current.clone().hour(data)
        }
      case 'SET_MINUTE':
        return {
          ...state,
          current: state.current.clone().minute(data),
          value: state.current.clone().minute(data)
        }
      case 'SET_VALUE':
        return {
          ...state,
          value: data.value ? data.value.clone() : data.value,
          current: data.value ? data.value.clone() : moment(),
          opened: (data.opened === null ? state.opened : data.opened)
        }
      default:
        return state
    }
  }

  const store = createStore(reducer)

  return {
    store,
    dispatch: store.dispatch.bind(store),
    subscribe: store.subscribe.bind(store),
    getState: store.getState.bind(store),
    actions
  }
}

export default storeBuilder
