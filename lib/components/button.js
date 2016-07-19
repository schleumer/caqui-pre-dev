'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _icon = require('./icon');

var _icon2 = _interopRequireDefault(_icon);

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Group = function (_Base) {
  (0, _inherits3.default)(Group, _Base);

  function Group(props) {
    (0, _classCallCheck3.default)(this, Group);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Base.call(this, props));

    _this.displayName = 'Button.Group';
    return _this;
  }

  Group.prototype.render = function render() {
    return _react2.default.createElement(
      'div',
      { className: 'caqui-button-group' },
      this.props.children
    );
  };

  return Group;
}(_base2.default);

/**
 * TODO: PropTypes, ButtonGroups
 */


var Button = function (_Base2) {
  (0, _inherits3.default)(Button, _Base2);

  function Button(props) {
    (0, _classCallCheck3.default)(this, Button);

    var _this2 = (0, _possibleConstructorReturn3.default)(this, _Base2.call(this, props));

    _this2.displayName = 'Button';
    return _this2;
  }

  Button.prototype.render = function render() {
    var _props = this.props;
    var type = _props.type;
    var className = _props.className;
    var _props2 = this.props;
    var label = _props2.label;
    var submit = _props2.submit;
    var to = _props2.to;
    var icon = _props2.icon;
    var size = _props2.size;
    var text = _props2.text;
    var block = _props2.block;
    var children = _props2.children;
    var buttonProps = (0, _objectWithoutProperties3.default)(_props2, ['label', 'submit', 'to', 'icon', 'size', 'text', 'block', 'children']);


    var classNames = (0, _classnames2.default)('caqui-button', type, className, size, {
      'caqui-button-block': block
    });

    var iconEl = null;

    if (icon) {
      iconEl = _react2.default.createElement(_icon2.default, {
        name: icon,
        style: { marginRight: '5px' } });
    }

    if (!to) {
      return _react2.default.createElement(
        'button',
        (0, _extends3.default)({}, buttonProps, {
          type: submit ? 'submit' : 'button',
          className: classNames }),
        _react2.default.createElement(
          'span',
          null,
          iconEl
        ),
        _react2.default.createElement(
          'span',
          null,
          children || text
        )
      );
    } else {
      return _react2.default.createElement(
        _reactRouter.Link,
        (0, _extends3.default)({}, buttonProps, { className: classNames }),
        _react2.default.createElement(
          'span',
          null,
          iconEl
        ),
        _react2.default.createElement(
          'span',
          null,
          children || text
        )
      );
    }
  };

  return Button;
}(_base2.default);

Button.Default = 'caqui-button-default';
Button.Primary = 'caqui-button-primary';
Button.Success = 'caqui-button-success';
Button.Info = 'caqui-button-info';
Button.Danger = 'caqui-button-danger';
Button.Warning = 'caqui-button-warning';
Button.Link = 'caqui-button-link';
Button.ExtraSmall = 'caqui-button-xs';
Button.Small = 'caqui-button-sm';
Button.Large = 'caqui-button-lg';
Button.Group = Group;
Button.defaultProps = {
  type: 'caqui-button-default',
  label: null,
  submit: false,
  to: null,
  icon: null,
  size: null,
  text: null
};
exports.default = Button;