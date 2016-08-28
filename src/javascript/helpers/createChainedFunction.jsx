/**
 * Safe chained function
 *
 * Will only create a new function if needed,
 * otherwise will pass back existing functions or null.
 *
 * @param {function} funcs functions to chain
 *
 * @return {function|null} chained function
 */
function createChainedFunction(...funcs) {
  return funcs
    .filter(f => f != null)
    .reduce((acc, f) => {
      if (typeof f !== 'function') {
        throw new Error('Invalid Argument Type, must only provide functions, undefined, or null.')
      }

      if (acc === null) {
        return f
      }

      return function chainedFunction(...args) {
        acc.apply(this, args)
        f.apply(this, args)
      }
    }, null)
}

export default createChainedFunction
