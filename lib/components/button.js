'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Button = function (_Base) {
  _inherits(Button, _Base);

  function Button(props) {
    _classCallCheck(this, Button);

    var _this = _possibleConstructorReturn(this, _Base.call(this, props));

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

    var classNames = (0, _classnames2.default)("caqui-button", type, className, size);

    var iconEl = null;

    if (icon) {
      iconEl = _react2.default.createElement(_icon2.default, { name: icon, style: { marginRight: '5px' } });
    }

    var props = _extends({}, this.props, {
      type: null,
      size: null,
      to: null,
      submit: null,

      className: classNames
    });

    if (!to) {
      return _react2.default.createElement(
        'button',
        _extends({}, props, { type: submit ? "submit" : "button" }),
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
  _inherits(Group, _Base2);

  function Group(props) {
    _classCallCheck(this, Group);

    var _this2 = _possibleConstructorReturn(this, _Base2.call(this, props));

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