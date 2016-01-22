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
let id = 1;

module.exports = function freeRoute(component, path, meta) {
  return {
    $$id: 'free.' + id++,
    component,
    path,
    meta,
    free: true
  };
};