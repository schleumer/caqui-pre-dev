'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

exports.__esModule = true;

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

var Button = function (_Base) {
  (0, _inherits3.default)(Button, _Base);

  function Button(props) {
    (0, _classCallCheck3.default)(this, Button);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Base.call(this, props));

    _this.displayName = 'Button';
    return _this;
  }

  Button.prototype.render = function render() {
    var _props = this.props;
    var type = _props.type;
    var className = _props.className;
    var icon = _props.icon;
    var size = _props.size;
    var to = _props.to;
    var submit = _props.submit;
    var text = _props.text;
    var children = _props.children;
    var block = _props.block;

    var classNames = (0, _classnames2.default)("caqui-button", type, className, size, {
      "caqui-button-block": block
    });

    var iconEl = null;

    if (icon) {
      iconEl = _react2.default.createElement(_icon2.default, { name: icon, style: { marginRight: '5px' } });
    }

    var props = (0, _extends3.default)({}, this.props, {
      type: null,
      size: null,
      to: null,
      submit: null,

      className: classNames
    });

    if (!to) {
      return _react2.default.createElement(
        'button',
        (0, _extends3.default)({}, props, { type: submit ? "submit" : "button" }),
        _react2.default.createElement(
          'span',
          null,
          icon
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
        props,
        _react2.default.createElement(
          'span',
          null,
          icon
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

Button.defaultProps = {
  type: "caqui-button-default",
  label: null,
  submit: false,
  to: null,
  icon: null,
  size: null,
  text: null
};

var Group = function (_Base2) {
  (0, _inherits3.default)(Group, _Base2);

  function Group(props) {
    (0, _classCallCheck3.default)(this, Group);

    var _this2 = (0, _possibleConstructorReturn3.default)(this, _Base2.call(this, props));

    _this2.displayName = 'Button.Group';
    return _this2;
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

Button.Default = "caqui-button-default";
Button.Primary = "caqui-button-primary";
Button.Success = "caqui-button-success";
Button.Info = "caqui-button-info";
Button.Danger = "caqui-button-danger";
Button.Warning = "caqui-button-warning";
Button.Link = "caqui-button-link";
Button.Group = Group;
Button.ExtraSmall = 'caqui-button-xs';
Button.Small = 'caqui-button-sm';
Button.Large = 'caqui-button-lg';

exports.default = Button;