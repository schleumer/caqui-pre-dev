'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var buttonStyle = _extends({}, _styles2.default.button, { width: '40px' });

var Header = function (_React$Component) {
  _inherits(Header, _React$Component);

  function Header(props) {
    _classCallCheck(this, Header);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.displayName = "DateTime(Header)";

    _this.addHour = _this.addHour.bind(_this);
    _this.subHour = _this.subHour.bind(_this);
    _this.addMinute = _this.addMinute.bind(_this);
    _this.subMinute = _this.subMinute.bind(_this);
    _this.minuteChanged = _this.minuteChanged.bind(_this);
    _this.hourChanged = _this.hourChanged.bind(_this);
    return _this;
  }

  Header.prototype.addHour = function addHour() {
    this.props.addHour();
  };

  Header.prototype.subHour = function subHour() {
    this.props.subHour();
  };

  Header.prototype.addMinute = function addMinute() {
    this.props.addMinute();
  };

  Header.prototype.subMinute = function subMinute() {
    this.props.subMinute();
  };

  Header.prototype.minuteChanged = function minuteChanged(evt) {
    var value = parseInt(this.refs.minute.value);

    if (value === undefined || value === null || isNaN(value)) {
      evt.return;
    }

    if (value < 0 || value > 59) {
      return;
    }

    this.props.setMinute(value);
  };

  Header.prototype.hourChanged = function hourChanged() {
    var value = parseInt(this.refs.hour.value);

    if (value === undefined || value === null || isNaN(value)) {
      return;
    }

    if (value < 0 || value > 23) {
      return;
    }

    this.props.setHour(value);
  };

  Header.prototype.render = function render() {
    var current = this.props.current;
    var addHour = this.addHour;
    var addMinute = this.addMinute;
    var subHour = this.subHour;
    var subMinute = this.subMinute;

    return _react2.default.createElement(
      'div',
      { style: _styles2.default.headerHolder },
      _react2.default.createElement(
        'table',
        { style: { margin: '0 auto' } },
        _react2.default.createElement(
          'tbody',
          null,
          _react2.default.createElement(
            'tr',
            null,
            _react2.default.createElement(
              'td',
              { style: { width: '50px', textAlign: 'center', paddingRight: '5px' } },
              _react2.default.createElement(
                'button',
                { type: 'button', style: buttonStyle, className: 'btn btn-xs btn-default', onClick: addHour },
                '+'
              )
            ),
            _react2.default.createElement(
              'td',
              { style: { width: '50px', textAlign: 'center', paddingRight: '5px' } },
              _react2.default.createElement(
                'button',
                { type: 'button', style: buttonStyle, className: 'btn btn-xs btn-default', onClick: addMinute },
                '+'
              )
            )
          ),
          _react2.default.createElement(
            'tr',
            null,
            _react2.default.createElement(
              'td',
              { style: { width: '50px', textAlign: 'center', fontSize: '18px', fontWeight: 'bold', paddingTop: '5px', paddingBottom: '5px', paddingRight: '5px' } },
              _react2.default.createElement('input', { type: 'text', value: current.format('HH'), onChange: this.hourChanged, className: 'form-control', style: { width: '35px', margin: '0 auto', textAlign: 'center' }, ref: 'hour' })
            ),
            _react2.default.createElement(
              'td',
              { style: { width: '50px', textAlign: 'center', fontSize: '18px', fontWeight: 'bold', paddingTop: '5px', paddingBottom: '5px', paddingRight: '5px' } },
              _react2.default.createElement('input', { type: 'text', value: current.format('mm'), onChange: this.minuteChanged, className: 'form-control', style: { width: '35px', margin: '0 auto', textAlign: 'center' }, ref: 'minute' })
            )
          ),
          _react2.default.createElement(
            'tr',
            null,
            _react2.default.createElement(
              'td',
              { style: { width: '50px', textAlign: 'center', paddingRight: '5px' } },
              _react2.default.createElement(
                'button',
                { type: 'button', style: buttonStyle, className: 'btn btn-xs btn-default', onClick: subHour },
                '-'
              )
            ),
            _react2.default.createElement(
              'td',
              { style: { width: '50px', textAlign: 'center', paddingRight: '5px' } },
              _react2.default.createElement(
                'button',
                { type: 'button', style: buttonStyle, className: 'btn btn-xs btn-default', onClick: subMinute },
                '-'
              )
            )
          )
        )
      )
    );
  };

  return Header;
}(_react2.default.Component);

Header.propTypes = {
  addHour: _react.PropTypes.func,
  subHour: _react.PropTypes.func,
  addMinute: _react.PropTypes.func,
  subMinute: _react.PropTypes.func
};
exports.default = Header;