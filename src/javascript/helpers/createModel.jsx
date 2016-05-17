import {OrderedMap} from 'immutable';

import {createStore} from 'redux';

import undoable, {ActionCreators} from 'redux-undo'

import slowUndo from './slowUndo'

const actions = {
    setValue(field, value) {
        return {
            type: 'SET_VALUE',
            data: {
                field,
                value
            }
        }
    },
    set(newData) {
        return {
            type: 'SET',
            data: newData
        }
    }
};

function buildStore(initial) {
    const initialState = new OrderedMap(initial);

    const reducer = function (state = initialState, action) {
        const {type, data} = action;

        switch (type) {
            case "SET_VALUE":
                return state.setIn(data.field.split('.'), data.value);
            case "SET":
                return new OrderedMap(data);
            default:
                return state;
        }
    };

    const reducers = undoable(reducer, {
        limit: 10,
        initialState,
        debug: false,
        filter: slowUndo
    });

    return createStore(reducers);
}

class Model {
    constructor(initial = {}) {
        this.store = buildStore({
            ...initial
        });
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

        return function ({event, target, data}) {
            store.dispatch(actions.setValue(name, data));
        }
    }

    setValue(name, data) {
        this.store.dispatch(actions.setValue(name, data));
    }

    set(data) {
        this.store.dispatch(actions.set(data));
    }

    subscribe(fn) {
        return this.store.subscribe(fn);
    }

    undo() {
        return this.store.dispatch(ActionCreators.undo());
    }
}

export default (initial = {}) => {
    return new Model(initial);
}