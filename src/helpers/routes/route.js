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

let id = 1;

module.exports = function route(component, path, meta) {
  return {
    $$id: id++,
    component,
    path,
    meta,
    free: false,
    index: false
  };
};