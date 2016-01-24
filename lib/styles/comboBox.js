'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.__esModule = true;

var _defaults = require('./defaults');

var _defaults2 = _interopRequireDefault(_defaults);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var root = {
  holder: {
    display: 'inline-block',
    verticalAlign: 'middle',
    width: '100%',
    position: 'relative'
  },
  label: _extends({}, _defaults2.default.label)
};

var dropDown = {
  holder: {
    userSelect: 'none'
  },
  menu: _extends({}, _defaults2.default.dropDown, {
    left: -10,
    top: -10,
    right: -10,
    minWidth: undefined
  }),
  list: _extends({}, _defaults2.default.list),
  listSearch: _extends({}, _defaults2.default.listItem),
  listSearchInput: _extends({}, _defaults2.default.input),
  listItem: _extends({}, _defaults2.default.listItem),
  listItemSelected: {},
  listItemActive: {},
  listItemAnchor: _extends({}, _defaults2.default.listItemAnchor),
  listItemAnchorSelected: {},
  listItemAnchorActive: {},
  text: _extends({}, _defaults2.default.listItem, _defaults2.default.listItemAnchor),
  footerText: _extends({}, _defaults2.default.listItem, _defaults2.default.listItemAnchor),
  divider: _extends({}, _defaults2.default.listItem, _defaults2.default.listItemAnchor)
};

var shadow = {
  display: _extends({}, _defaults2.default.input, {
    height: 'auto',
    position: 'relative'
  }),
  displayLabel: {},
  displayIcon: {
    position: 'absolute',
    top: '5px',
    right: '5px'
  }
};

exports.default = {
  dropDown: dropDown,
  shadow: shadow,
  root: root
};