'use strict';

/**
 *
 */

var id = 1;

module.exports = function routeGroup(meta, children) {
  return {
    $$id: 'group.' + id++,
    meta: meta,
    children: children
  };
};