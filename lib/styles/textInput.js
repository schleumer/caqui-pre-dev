'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.__esModule = true;

var _defaults = require('./defaults');

var _defaults2 = _interopRequireDefault(_defaults);

var _colors = require('./colors');

var _colors2 = _interopRequireDefault(_colors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import { toRgba } from

exports.default = {
  label: (0, _extends3.default)({}, _defaults2.default.label),
  normal: (0, _extends3.default)({}, _defaults2.default.input),
  focused: {
    border: '1px solid ' + _colors2.default.brandPrimary,
    WebkitBoxShadow: 'inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, 0.6)',
    boxShadow: 'inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, 0.6)'
  }
};