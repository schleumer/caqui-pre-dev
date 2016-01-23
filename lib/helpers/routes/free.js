'use strict';

/**
 * @param component
 * @param path
 * @param template
 * @param name
 * @param meta
 * @returns {{
 *   component: function,
 *   path: string,
 *   name: string,
 *   meta: *,
 *   free: boolean
 * }}
 */
var id = 1;

module.exports = function freeRoute(component, path, meta) {
  return {
    $$id: 'free.' + id++,
    component: component,
    path: path,
    meta: meta,
    free: true
  };
};