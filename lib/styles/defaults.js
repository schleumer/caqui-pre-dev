'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.__esModule = true;

var _root = require('./root');

var _root2 = _interopRequireDefault(_root);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stylesheet = {
  button: {
    display: 'inline-block',
    marginBottom: 0,
    textAlign: 'center',
    verticalAlign: 'middle',
    MsTouchAction: 'manipulation',
    touchAction: 'manipulation',
    cursor: 'pointer',
    backgroundImage: 'none',
    whiteSpace: 'nowrap',
    lineHeight: 1.42857143,
    borderRadius: 4,
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    MsUserSelect: 'none',
    userSelect: 'none',
    padding: '10px 12px 7px',
    borderWidth: '0 1px 4px 1px',
    borderStyle: 'solid',
    fontSize: '12px',
    textTransform: 'uppercase',
    fontWeight: 'bold'
  },
  input: _extends({}, _root2.default.text, {
    display: 'block',
    width: '100%',
    height: '38px',
    padding: '7px 12px',
    fontSize: '14px',
    lineHeight: '1.42857143',
    backgroundColor: '#ffffff',
    backgroundImage: 'none',
    border: '1px solid #e7e7e7',
    borderRadius: '4px',
    WebkitTransition: 'border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s',
    OTransition: 'border-color ease-in-out .15s, box-shadow ease-in-out .15s',
    transition: 'border-color ease-in-out .15s, box-shadow ease-in-out .15s',
    boxShadow: 'inset 0 2px 0 rgba(0, 0, 0, 0.075)',
    WebkitBoxShadow: 'inset 0 2px 0 rgba(0, 0, 0, 0.075)'
  }),
  list: {
    padding: 0,
    margin: 0
  },
  listItem: {
    listStyle: 'none'
  },
  listItemAnchor: {
    padding: '12px',
    display: 'block'
  },
  dropDown: {
    padding: '10px',
    position: 'absolute',
    top: '100%',
    left: '0',
    zIndex: '1000',
    float: 'left',
    minWidth: '160px',
    listStyle: 'none',
    fontSize: '14px',
    textAlign: 'left',
    backgroundColor: '#ffffff',
    border: '1px solid #cccccc',
    border: '1px solid #e7e7e7',
    borderRadius: '4px',
    WebkitBoxShadow: '0 6px 12px rgba(0, 0, 0, 0.175)',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.175)',
    WebkitBackgroundClip: 'padding-box',
    backgroundClip: 'padding-box'
  },
  label: _extends({}, _root2.default.text, {
    display: 'inline-block',
    maxWidth: '100%',
    marginBottom: 5
  })
};

exports.default = stylesheet;