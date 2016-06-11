import * as constants from '../constants'

const initialState = {
  state: false,
  message: null,
  subMessage: null
}

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case constants.IS_LOADING:
      return {
        ...state,
        ...{
          state: false,
          message: null,
          subMessage: null
        },
        ...action.data
      }
    default:
      return state
  }
}
