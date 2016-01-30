import * as constants from '../constants';

const initialState = [];

let id = 0;

const bindId = _ => {
  if (!_.id)
    _.id = id++;
  return _;
}

export default function(state = initialState, action = {}) {

  const {data, type} = action;

  const index = state.indexOf(data);

  switch (type) {
    case constants.ERROR:
      return [
        ...state,
        bindId(data)
      ];
    case constants.DUMP_ERRORS_FROM_REQUEST:
      return [
        ...state,
        ...data.map(bindId)
      ]
    case constants.FORGET_ERROR:
      return [
        ...state.slice(0, index),
        ...state.slice(index + 1)
      ]
    default:
      return state;
  }
}