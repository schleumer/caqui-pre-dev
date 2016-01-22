import * as constants from '../constants';

const initialState = {
  user: null,
  isLoading: false,
}

export default function(state = initialState, action = {}) {

  const {data, type} = action;

  switch (type) {
    case constants.LOGIN_SUBMITTED:
      return {
        ...state,
        user: data.user,
        isLoading: true,
      };

    case constants.LOGIN_SUCCEEDED:
      return initialState;

    case constants.LOGIN_FAILED:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
}