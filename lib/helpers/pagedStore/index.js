'use strict';

exports.__esModule = true;
exports.pagedRemoteStore = exports.pagedArrayStore = undefined;

var _pagedArrayStore2 = require('./pagedArrayStore');

var _pagedArrayStore3 = _interopRequireDefault(_pagedArrayStore2);

var _pagedRemoteStore2 = require('./pagedRemoteStore');

var _pagedRemoteStore3 = _interopRequireDefault(_pagedRemoteStore2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.pagedArrayStore = _pagedArrayStore3.default;
exports.pagedRemoteStore = _pagedRemoteStore3.default;