"use strict";

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

module.exports = function route(component, path, meta) {
  return {
    $$id: id++,
    component: component,
    path: path,
    meta: meta,
    free: false,
    index: false
  };
};