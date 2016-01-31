'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _system = require('./system');

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// TODO: beautify, maybe change the anchor(<a />) element

var Day = function (_React$Component) {
  _inherits(Day, _React$Component);

  function Day(props) {
    _classCallCheck(this, Day);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.displayName = 'DateTime(Day)';
    _this.pick = _this.pick.bind(_this);

    _this.dayHovered = _this.dayHovered.bind(_this);
    _this.dayLeft = _this.dayLeft.bind(_this);

    _this.state = {
      hovered: false
    };
    return _this;
  }

  Day.prototype.pick = function pick() {
    this.props.onPick(this.props.day);
  };

  Day.prototype.dayHovered = function dayHovered() {
    this.setState({ hovered: true });
  };

  Day.prototype.dayLeft = function dayLeft() {
    this.setState({ hovered: false });
  };

  Day.prototype.render = function render() {
    var _props = this.props;
    var day = _props.day;
    var value = _props.value;
    var hovered = this.state.hovered;

    var style = _styles2.default.day;

    if (day.format("YYYY-MM-DD") === value.format("YYYY-MM-DD")) {
      style = _extends({}, style, _styles2.default.selectedDay);
    }

    if (day.format("YYYY-MM-DD") === _system.today.format("YYYY-MM-DD")) {
      style = _extends({}, style, _styles2.default.dayToday);
    }

    return _react2.default.createElement(
      'a',
      { href: 'javascript:;',
        className: 'caqui-datetime-day',
        onMouseEnter: this.dayHovered,
        onMouseLeave: this.dayLeft,
        onClick: this.pick },
      day.format("DD")
    );
  };

  return Day;
}(_react2.default.Component);

Day.propTypes = {
  pick: _react.PropTypes.func,
  value: _react.PropTypes.object,
  day: _react.PropTypes.object
};
exports.default = Day;