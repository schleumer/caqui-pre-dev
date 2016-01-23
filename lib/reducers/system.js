"use strict";

exports.__esModule = true;

exports.default = function () {
  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
  var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var type = action.type;

  switch (type) {
    default:
      return state;
  }
};

var initialState = {
  because: null
};