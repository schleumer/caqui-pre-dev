'use strict';

/**
 *
 */

var id = 1;

module.exports = function nestedRoute(component, path, meta, children) {
  return {
    $$id: 'nested.' + id++,
    meta: meta,
    path: path,
    component: component,
    children: children
  };
};