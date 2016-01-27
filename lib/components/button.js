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

var _styles = require('../styles');

var Styles = _interopRequireWildcard(_styles);

var _system = require('../system');

var system = _interopRequireWildcard(_system);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = Styles.button;

var Button = function (_Base) {
  _inherits(Button, _Base);

  function Button(props) {
    _classCallCheck(this, Button);

    var _this = _possibleConstructorReturn(this, _Base.call(this, props));

    _this.displayName = 'Button';

    _this.onFocus = _this.onFocus.bind(_this);
    _this.onBlur = _this.onBlur.bind(_this);
    _this.onMouseDown = _this.onMouseDown.bind(_this);
    _this.onMouseUp = _this.onMouseUp.bind(_this);
    _this.onMouseEnter = _this.onMouseEnter.bind(_this);
    _this.onMouseLeave = _this.onMouseLeave.bind(_this);

    _this.state = {
      pressed: false,
      focused: false,
      hovered: false
    };
    return _this;
  }

  Button.prototype.onFocus = function onFocus() {
    this.setState({ focused: true });
    if (this.props.onFocus) {
      this.props.onFocus.apply(null, arguments);
    }
  };

  Button.prototype.onBlur = function onBlur() {
    this.setState({ focused: false });

    if (this.props.onBlur) {
      this.props.onBlur.apply(null, arguments);
    }
  };

  Button.prototype.onMouseDown = function onMouseDown() {
    this.setState({ pressed: true });

    if (this.props.onMouseDown) {
      this.props.onMouseDown.apply(null, arguments);
    }
  };

  Button.prototype.onMouseUp = function onMouseUp() {
    this.setState({ pressed: false });

    if (this.props.onMouseUp) {
      this.props.onMouseUp.apply(null, arguments);
    }
  };

  Button.prototype.onMouseEnter = function onMouseEnter() {
    this.setState({ hovered: true });

    if (this.props.onMouseEnter) {
      this.props.onMouseEnter.apply(null, arguments);
    }
  };

  Button.prototype.onMouseLeave = function onMouseLeave() {
    this.setState({ hovered: false, pressed: false /* will avoid mouse pressed state while outside of the button */ });

    if (this.props.onMouseLeave) {
      this.props.onMouseLeave.apply(null, arguments);
    }
  };

  Button.prototype.render = function render() {
    var props = _extends({}, this.props, {
      onFocus: this.onFocus,
      onBlur: this.onBlur,
      onMouseDown: this.onMouseDown,
      onMouseUp: this.onMouseUp,
      onMouseEnter: this.onMouseEnter,
      onMouseLeave: this.onMouseLeave
    });

    var submit = props.submit || false;

    var classes = (0, _classnames2.default)(styles.default, styles.sizes[props.size], props.className);

    console.log(styles, classes);

    var icon = null;
    if (props.icon) {
      icon = _react2.default.createElement(_icon2.default, { name: props.icon, style: { marginRight: '5px' } });
    }

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

Button.propTypes = {
  type: _react.PropTypes.oneOf(["default", "primary", "success", "info", "danger", "warning", "link"]),
  onFocus: _react.PropTypes.func,
  onBlur: _react.PropTypes.func,
  onMouseDown: _react.PropTypes.func,
  onMouseUp: _react.PropTypes.func,
  onMouseEnter: _react.PropTypes.func,
  onMouseLeave: _react.PropTypes.func
};
Button.defaultProps = {
  type: "default",
  size: "default"
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

Button.Default = "default";
Button.Primary = "primary";
Button.Success = "success";
Button.Info = "info";
Button.Danger = "danger";
Button.Warning = "warning";
Button.Link = "link";
Button.Group = Group;
Button.ExtraSmall = 'extraSmall';
Button.Small = 'small';
Button.Large = 'large';

exports.default = Button;