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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _system = require('./system');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO: beautify, maybe change the anchor(<a />) element
var Day = function (_React$Component) {
  (0, _inherits3.default)(Day, _React$Component);

  function Day(props) {
    (0, _classCallCheck3.default)(this, Day);

    var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this, props));

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
    this.setState({
      hovered: true
    });
  };

  Day.prototype.dayLeft = function dayLeft() {
    this.setState({
      hovered: false
    });
  };

  Day.prototype.render = function render() {
    var _props = this.props;
    var day = _props.day;
    var value = _props.value;
    //const { hovered } = this.state

    var classNames = (0, _classnames2.default)('caqui-datetime-day', {
      'caqui-datetime-day-selected': day.format('YYYY-MM-DD') === value.format('YYYY-MM-DD'),
      'caqui-datetime-day-today': day.format('YYYY-MM-DD') === _system.today.format('YYYY-MM-DD')
    });

    return _react2.default.createElement(
      'a',
      {
        href: 'javascript:',
        className: classNames,
        onMouseEnter: this.dayHovered,
        onMouseLeave: this.dayLeft,
        onClick: this.pick },
      day.format('DD')
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