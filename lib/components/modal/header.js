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

/**
 * TODO: PropTypes
 */

var Header = function (_React$Component) {
  (0, _inherits3.default)(Header, _React$Component);

  function Header(props) {
    (0, _classCallCheck3.default)(this, Header);

    var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this, props));

    _this.onClose = _this.onClose.bind(_this);
    return _this;
  }

  Header.prototype.onClose = function onClose() {
    if (this.props.onClose) {
      this.props.onClose();
    }
  };

  Header.prototype.render = function render() {
    if (this.props.children) {
      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          "button",
          {
            type: "button",
            className: "close",
            "data-dismiss": "modal",
            "aria-label": "Close",
            onClick: this.onClose },
          _react2.default.createElement(
            "span",
            { "aria-hidden": "true" },
            "×"
          )
        ),
        this.props.children
      );
    }

    return _react2.default.createElement(
      "div",
      null,
      _react2.default.createElement(
        "button",
        {
          type: "button",
          className: "close",
          "data-dismiss": "modal",
          "aria-label": "Close" },
        _react2.default.createElement(
          "span",
          { "aria-hidden": "true" },
          "×"
        )
      ),
      _react2.default.createElement(
        "h4",
        { className: "modal-title" },
        this.props.title || 'Selecione os valores'
      )
    );
  };

  return Header;
}(_react2.default.Component);

exports.default = Header;