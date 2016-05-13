import { OrderedMap } from 'immutable';

import { createStore, compose, applyMiddleware, combineReducers } from 'redux';

import thunk from 'redux-thunk';

import undoable, { ActionCreators } from 'redux-undo'

import slowUndo from './slowUndo'

const actions = {
  setValue(field, value, version) {
    return {
      type: 'SET_VALUE',
      data: {
        field,
        value,
        version
      }
    }
  },
  set(newData, version) {
    return {
      type: 'SET',
      data: {
        newData,
        version
      }
    }
  }
}

function buildStore(initial) {
  const initialState = new OrderedMap(initial);

  const reducer = function(state = initialState, action) {
    const {type, data} = action;

    switch (type) {
      case "SET_VALUE":
        const newValue = state
          .set("version", data.version)
          .setIn(data.field.split('.'), data.value);
        return newValue;
      case "SET":
        return new OrderedMap(data.newData)
          .set("version", data.version)
      default:
        return state;
    }
  }

  const reducers = undoable(reducer, {
    limit: 10,
    initialState,
    debug: false,
    filter: slowUndo
  });

  const store = compose(
    applyMiddleware(thunk)
  )(createStore)(reducers);

  return store;
}

class Model {
  constructor(initial = {}) {
    this.store = buildStore({
      ...initial,
      version: 0
    });
    this.version = 0;
  }

  getValue(name) {
    const state = this.store.getState();
    if (name) {
      return state.present.getIn(name.split('.'));
    } else {
      return state.present.toJS();
    }
  }

  onChange(name, before = null) {
    const {store} = this;

    return function({event, target, data}) {
      this.version = this.version + 1;

      store.dispatch(actions.setValue(name, data, this.version));
    }
  }

  setValue(name, data) {
    this.version = this.version + 1;

    this.store.dispatch(actions.setValue(name, data, this.version));
  }

  set(data) {
    this.version = this.version + 1;

    this.store.dispatch(actions.set(data, this.version));
  }

  getVersion() {
    const state = this.store.getState();
    return state.present.get('version');
  }

  subscribe(fn) {
    return this.store.subscribe(fn);
  }

  undo() {
    return this.store.dispatch(ActionCreators.undo());
  }
}

export default (initial = {
    version: 0
  }) => {
  return new Model(initial);
}