const resultHasErrors = (result) => {
  let realBody = null

  if (result.hasOwnProperty('data')) {
    realBody = result.data
  } else {
    realBody = result
  }

  return realBody.hasOwnProperty('errors')
    && Array.isArray(realBody.errors)
    && realBody.errors.length > 0
}

export default resultHasErrors
