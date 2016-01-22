/**
 *
 */

let id = 1;

module.exports = function nestedRoute(component, path, meta, children) {
  return {
    $$id: 'nested.' + (id++),
    meta,
    path,
    component,
    children
  };
};