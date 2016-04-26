"use strict";

exports.__esModule = true;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Footer = function (_React$Component) {
  (0, _inherits3.default)(Footer, _React$Component);

  function Footer(props) {
    (0, _classCallCheck3.default)(this, Footer);

    var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this, props));

    _this.displayName = "DateTime(Footer)";

    _this.addHour = _this.addHour.bind(_this);
    _this.subHour = _this.subHour.bind(_this);
    _this.addMinute = _this.addMinute.bind(_this);
    _this.subMinute = _this.subMinute.bind(_this);
    _this.minuteChanged = _this.minuteChanged.bind(_this);
    _this.hourChanged = _this.hourChanged.bind(_this);
    return _this;
  }

  Footer.prototype.addHour = function addHour() {
    this.props.addHour();
  };

  Footer.prototype.subHour = function subHour() {
    this.props.subHour();
  };

  Footer.prototype.addMinute = function addMinute() {
    this.props.addMinute();
  };

  Footer.prototype.subMinute = function subMinute() {
    this.props.subMinute();
  };

  Footer.prototype.minuteChanged = function minuteChanged(evt) {
    var value = parseInt(this.refs.minute.value);

    if (value === undefined || value === null || isNaN(value)) {
      evt.return;
    }

    if (value < 0 || value > 59) {
      return;
    }

    this.props.setMinute(value);
  };

  Footer.prototype.hourChanged = function hourChanged() {
    var value = parseInt(this.refs.hour.value);

    if (value === undefined || value === null || isNaN(value)) {
      return;
    }

    if (value < 0 || value > 23) {
      return;
    }

    this.props.setHour(value);
  };

  Footer.prototype.render = function render() {
    var current = this.props.current;
    var addHour = this.addHour;
    var addMinute = this.addMinute;
    var subHour = this.subHour;
    var subMinute = this.subMinute;


    return _react2.default.createElement(
      "div",
      { className: "caqui-datetime-footer-holder" },
      _react2.default.createElement(
        "table",
        { className: "caqui-datetime-footer-table" },
        _react2.default.createElement(
          "tbody",
          null,
          _react2.default.createElement(
            "tr",
            null,
            _react2.default.createElement(
              "td",
              { className: "caqui-datetime-footer-add-hour" },
              _react2.default.createElement(
                "button",
                { type: "button", className: "caqui-button caqui-button-xs caqui-button-default", onClick: addHour },
                "+"
              )
            ),
            _react2.default.createElement(
              "td",
              { className: "caqui-datetime-footer-add-minute" },
              _react2.default.createElement(
                "button",
                { type: "button", className: "caqui-button caqui-button-xs caqui-button-default", onClick: addMinute },
                "+"
              )
            )
          ),
          _react2.default.createElement(
            "tr",
            null,
            _react2.default.createElement(
              "td",
              { className: "caqui-datetime-footer-hour" },
              _react2.default.createElement("input", { type: "text", value: current.format('HH'), onChange: this.hourChanged, className: "form-control", ref: "hour" })
            ),
            _react2.default.createElement(
              "td",
              { className: "caqui-datetime-footer-minute" },
              _react2.default.createElement("input", { type: "text", value: current.format('mm'), onChange: this.minuteChanged, className: "form-control", ref: "minute" })
            )
          ),
          _react2.default.createElement(
            "tr",
            null,
            _react2.default.createElement(
              "td",
              { className: "caqui-datetime-footer-sub-hour" },
              _react2.default.createElement(
                "button",
                { type: "button", className: "caqui-button caqui-button-xs caqui-button-default", onClick: subHour },
                "-"
              )
            ),
            _react2.default.createElement(
              "td",
              { className: "caqui-datetime-footer-sub-minute" },
              _react2.default.createElement(
                "button",
                { type: "button", className: "caqui-button caqui-button-xs caqui-button-default", onClick: subMinute },
                "-"
              )
            )
          )
        )
      )
    );
  };

  return Footer;
}(_react2.default.Component);

Footer.propTypes = {
  addHour: _react.PropTypes.func,
  subHour: _react.PropTypes.func,
  addMinute: _react.PropTypes.func,
  subMinute: _react.PropTypes.func
};
exports.default = Footer;