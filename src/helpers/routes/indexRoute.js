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

module.exports = function indexRoute(component, path = '/', meta = null) {
  return {
    $$id: 'indexRoute.' + id++,
    component,
    path,
    meta,
    free: false,
    index: true
  };
};