'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.__esModule = true;

var _defaults = require('./defaults');

var _defaults2 = _interopRequireDefault(_defaults);

var _colors = require('./colors');

var _colors2 = _interopRequireDefault(_colors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import { toRgba } from

exports.default = {
  label: _extends({}, _defaults2.default.label),
  normal: _extends({}, _defaults2.default.input),
  focused: {
    border: '1px solid ' + _colors2.default.brandPrimary,
    WebkitBoxShadow: 'inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, 0.6)',
    boxShadow: 'inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, 0.6)'
  }
};