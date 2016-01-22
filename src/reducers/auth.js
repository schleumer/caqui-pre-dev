import * as constants from '../constants';

const initialState = {
  authenticated: false,
  user: null,
  firstFetch: false
};

export default function (state = initialState, action = {}) {
  const {data, type} = action;

  switch (type) {
    case constants.USER_FIRST_FETCH:
      return {
        ...state,
        firstFetch: true
      };
    case constants.USER_LOGOUT:
      return {
        ...state,
        authenticated: false,
        user: null
      };

    case constants.USER_FETCH_SUCCEEDED:
      return {
        ...state,
        authenticated: true,
        user: data,
      };

    case constants.TOKEN_DELETE_FAILED:
      return {
        ...state,
        authenticated: false,
      };

    default:
      return state;
  }
}