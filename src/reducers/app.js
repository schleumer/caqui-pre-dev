import * as constants from '../constants';

const initialState = {
  because: null
}

export default function(state = initialState, action = {}) {

  const {data, type} = action;

  switch (type) {
    case constants.WHY:
      return {
        ...state,
        because: data.because
      };
    default:
      return state;
  }
}