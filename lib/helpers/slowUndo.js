"use strict";

exports.__esModule = true;
exports.default = slowUndo;
// TODO: refactor
// @see https://github.com/omnidan/redux-undo/issues/70
// @see https://github.com/omnidan/redux-undo/issues/24

var filter = void 0;
function slowUndo(action, currentState, previousState) {
  if (!filter) {
    filter = setTimeout(function () {
      filter = false;
    }, 1000);
    return true;
  }
  return false;
}