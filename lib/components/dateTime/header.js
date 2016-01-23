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

var Header = function (_React$Component) {
  _inherits(Header, _React$Component);

  function Header(props) {
    _classCallCheck(this, Header);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.displayName = "DateTime(Header)";

    _this.prevMonth = _this.prevMonth.bind(_this);
    _this.nextMonth = _this.nextMonth.bind(_this);
    return _this;
  }

  Header.prototype.prevMonth = function prevMonth(evt) {
    this.props.prevMonth(evt);
  };

  Header.prototype.nextMonth = function nextMonth(evt) {
    this.props.nextMonth(evt);
  };

  Header.prototype.render = function render() {
    var current = this.props.current;

    return _react2.default.createElement(
      'div',
      { style: _styles2.default.headerHolder },
      _react2.default.createElement(
        'table',
        null,
        _react2.default.createElement(
          'tbody',
          null,
          _react2.default.createElement(
            'tr',
            null,
            _react2.default.createElement(
              'td',
              null,
              _react2.default.createElement(
                'button',
                { type: 'button',
                  onClick: this.prevMonth,
                  className: 'btn btn-xs btn-default',
                  style: _extends({}, _styles2.default.button, _styles2.default.headerButtonLeft) },
                '<'
              )
            ),
            _react2.default.createElement(
              'td',
              { style: _styles2.default.headerCurrentDayHolder },
              _react2.default.createElement(
                'div',
                { tabIndex: '0', style: _styles2.default.headerCurrentDay },
                current.format("MMMM - YYYY")
              )
            ),
            _react2.default.createElement(
              'td',
              null,
              _react2.default.createElement(
                'button',
                { type: 'button',
                  onClick: this.nextMonth,
                  className: 'btn btn-xs btn-default',
                  style: _extends({}, _styles2.default.button, _styles2.default.headerButtonLeft) },
                '>'
              )
            )
          )
        )
      )
    );
  };

  return Header;
}(_react2.default.Component);

exports.default = Header;