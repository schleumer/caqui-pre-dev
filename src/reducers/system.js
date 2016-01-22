const initialState = {
  because: null
}

export default function(state = initialState, action = {}) {
  const {type} = action;

  switch (type) {
    default:
      return state;
  }
}