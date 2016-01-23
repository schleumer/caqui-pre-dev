'use strict';

/**
 *
 * @param component
 * @param path
 * @param template
 * @param name
 * @param meta
 * @returns {{
 *   component: function,
 *   path: string,
 *   meta: *,
 *   free: boolean
 * }}
 */

var id = 1;

module.exports = function indexRoute(component) {
  var path = arguments.length <= 1 || arguments[1] === undefined ? '/' : arguments[1];
  var meta = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

  return {
    $$id: 'indexRoute.' + id++,
    component: component,
    path: path,
    meta: meta,
    free: false,
    index: true
  };
};