import * as constants from '../constants';

const initialState = {
  because: null
}

export default function(state = initialState, action = {}) {

  const {type} = action;

  switch (type) {
    case constants.APPLICATION_LOADED:
      return state;
    default:
      return state;
  }
}