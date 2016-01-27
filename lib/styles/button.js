'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.__esModule = true;

var _reactInline = require('react-inline');

var _reactInline2 = _interopRequireDefault(_reactInline);

var _colors = require('./colors');

var _colors2 = _interopRequireDefault(_colors);

var _defaults = require('./defaults');

var _defaults2 = _interopRequireDefault(_defaults);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _reactInline2.default.create({
  default: _extends({}, _defaults2.default.button, {
    color: '#555555',
    backgroundColor: _colors2.default.grayLighter,
    borderColor: '#e2e2e2', // TODO: fix
    ':focus': {
      marginTop: '1px',
      borderWidth: '0 1px 3px 1px'
    },
    ':hover': {
      marginTop: '1px',
      borderWidth: '0 1px 3px 1px'
    },
    ':active': {
      marginTop: '2px',
      borderWidth: '0 1px 2px 1px',
      WebkitBoxShadow: 'none',
      boxShadow: 'none',
      color: '#555555',
      backgroundColor: '#d5d5d5',
      borderColor: '#c3c3c3'
    }
  }),
  primary: {},
  success: {},
  info: {},
  warning: {},
  danger: {},
  sizes: {
    default: {},
    large: {},
    small: {},
    extraSmall: {}
  }
});