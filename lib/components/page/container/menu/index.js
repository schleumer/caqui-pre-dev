'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _left = require('./left');

var _left2 = _interopRequireDefault(_left);

var _right = require('./right');

var _right2 = _interopRequireDefault(_right);

var _base = require('../../../base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * TODO: PropTypes
 */
var Menu = function (_Base) {
  (0, _inherits3.default)(Menu, _Base);

  function Menu(props) {
    (0, _classCallCheck3.default)(this, Menu);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Base.call(this, props));

    _this.displayName = 'Page.Container.Menu';
    return _this;
  }

  Menu.prototype.render = function render() {

    return _react2.default.createElement(
      'div',
      { className: 'row',
        style: { marginBottom: '15px', marginTop: '5px' } },
      _react2.default.createElement(
        'div',
        { className: 'col-xs-12' },
        this.props.children
      )
    );
  };

  return Menu;
}(_base2.default);

Menu.Left = _left2.default;
Menu.Right = _right2.default;

exports.default = Menu;