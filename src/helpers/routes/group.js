/**
 *
 */

let id = 1;

module.exports = function routeGroup(meta, children) {
  return {
    $$id: 'group.' + (id++),
    meta,
    children
  };
};