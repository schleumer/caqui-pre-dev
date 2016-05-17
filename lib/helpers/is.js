"use strict";

exports.__esModule = true;

exports.default = function (Ctor, val) {
    return val != null && val.constructor === Ctor || val instanceof Ctor;
};