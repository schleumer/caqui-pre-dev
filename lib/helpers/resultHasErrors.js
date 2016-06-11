'use strict';

exports.__esModule = true;
var resultHasErrors = function resultHasErrors(result) {
  var realBody = null;

  if (result.hasOwnProperty('data')) {
    realBody = result.data;
  } else {
    realBody = result;
  }

  return realBody.hasOwnProperty('errors') && Array.isArray(realBody.errors) && realBody.errors.length > 0;
};

exports.default = resultHasErrors;