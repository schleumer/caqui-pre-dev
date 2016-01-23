'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _icon = require('./icon');

var _icon2 = _interopRequireDefault(_icon);

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

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
    var props = _extends({}, this.props);

    var submit = props.submit || false,
        elClass = this.props.className || "",
        className = ["btn", this.props.type].concat(elClass.split(' '));

    var icon = null;

    if (props.icon) {
      icon = _react2.default.createElement(_icon2.default, { name: props.icon, style: { marginRight: '5px' } });
    }

    if (props.size) {
      className.push(props.size);
    }

    props.className = className.join(' ');

    if (!this.props.href) {
      return _react2.default.createElement(
        'button',
        _extends({ type: submit ? "submit" : "button" }, props),
        icon,
        this.props.children || this.props.text
      );
    } else {
      return _react2.default.createElement(
        'a',
        props,
        icon,
        this.props.children || this.props.text
      );
    }
  };

  return Button;
}(_base2.default);

Button.defaultProps = {
  type: "btn-default"
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
      { className: 'btn-group' },
      this.props.children
    );
  };

  return Group;
}(_base2.default);

Button.Default = "btn-default";
Button.Primary = "btn-primary";
Button.Success = "btn-success";
Button.Info = "btn-info";
Button.Danger = "btn-danger";
Button.Warning = "btn-warning";
Button.Link = "btn-link";
Button.Group = Group;
Button.ExtraSmall = 'btn-xs';
Button.Small = 'btn-sm';
Button.Large = 'btn-lg';

exports.default = Button;