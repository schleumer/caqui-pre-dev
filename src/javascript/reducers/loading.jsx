import * as constants from '../constants';

const initialState = {
  state: false,
  message: null,
  subMessage: null
};

export default function (state = initialState, action = {}) {
  const {data, type} = action;

  switch (type) {
    case constants.IS_LOADING:
      return {
        ...state,
        ...{
          state: false,
          message: null,
          subMessage: null
        },
        ...data,
      };

    default:
      return state;
  }
}