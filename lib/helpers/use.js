'use strict';

/**
 * @todo deixar mais bonito e purpurinado
 * @param route
 * @returns {{
 *   template: *,
 *   controller: *,
 *   resolve: Function
 * }}
 */
module.exports = function use(route) {
  return {
    template: route.template,
    controller: route.name,
    resolve: {
      it: /*@ngInject*/function resolver(Auth, Loading, $location, $q) {
        if (route.free) {
          return Loading.follow($q(function (resolve) {
            return resolve();
          }));
        } else {
          return Loading.follow(Auth.check().then(function (user) {
            return user;
          }).catch(function () {
            return $location.path('/auth');
          }));
        }
      }
    }
  };
};