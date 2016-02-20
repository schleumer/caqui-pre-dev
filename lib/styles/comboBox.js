'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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
  label: (0, _extends3.default)({}, _defaults2.default.label)
};

var dropDown = {
  holder: {
    userSelect: 'none'
  },
  menu: (0, _extends3.default)({}, _defaults2.default.dropDown, {
    left: -10,
    top: -10,
    right: -10,
    minWidth: undefined
  }),
  list: (0, _extends3.default)({}, _defaults2.default.list),
  listSearch: (0, _extends3.default)({}, _defaults2.default.listItem),
  listSearchInput: (0, _extends3.default)({}, _defaults2.default.input),
  listItem: (0, _extends3.default)({}, _defaults2.default.listItem),
  listItemSelected: {},
  listItemActive: {},
  listItemAnchor: (0, _extends3.default)({}, _defaults2.default.listItemAnchor),
  listItemAnchorSelected: {},
  listItemAnchorActive: {},
  text: (0, _extends3.default)({}, _defaults2.default.listItem, _defaults2.default.listItemAnchor),
  footerText: (0, _extends3.default)({}, _defaults2.default.listItem, _defaults2.default.listItemAnchor),
  divider: (0, _extends3.default)({}, _defaults2.default.listItem, _defaults2.default.listItemAnchor)
};

var shadow = {
  display: (0, _extends3.default)({}, _defaults2.default.input, {
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