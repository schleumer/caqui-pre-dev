import * as constants from '../constants'

const initialState = []

let id = 0

export default function (state = initialState, action = {}) {
  const { data, type } = action

  const index = state.indexOf(data)

  switch (type) {
    case constants.MESSAGE:
      if (!data.id)
        data.id = id++
      return [
        ...state,
        data
      ]
    case constants.DUMP_MESSAGES_FROM_REQUEST:
      return [
        ...state,
        ...data
      ]
    case constants.FORGET_MESSAGE:
      return [
        ... state.slice(0, index),
        ... state.slice(index + 1)
      ]
    default:
      return state
  }
}
