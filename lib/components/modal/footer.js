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

    _this.primaryClicked = _this.primaryClicked.bind(_this);
    _this.secondaryClicked = _this.secondaryClicked.bind(_this);
    return _this;
  }

  Footer.prototype.primaryClicked = function primaryClicked() {
    if (this.props.onPrimaryClick) {
      this.props.onPrimaryClick();
    }
  };

  Footer.prototype.secondaryClicked = function secondaryClicked() {
    if (this.props.onSecondaryClick) {
      this.props.onSecondaryClick();
    }
  };

  Footer.prototype.render = function render() {
    var secondaryButton = null;

    if (this.props.withSecondary) {
      secondaryButton = _react2.default.createElement(
        "button",
        {
          type: "button",
          className: "btn btn-default",
          "data-dismiss": "modal",
          onClick: this.secondaryClicked },
        this.props.secondaryText
      );
    }

    if (this.props.children) {
      return _react2.default.createElement(
        "div",
        null,
        secondaryButton,
        this.props.children
      );
    }

    return _react2.default.createElement(
      "div",
      { className: "modal-footer" },
      secondaryButton,
      _react2.default.createElement(
        "button",
        {
          type: "button",
          className: "btn btn-primary",
          onClick: this.primaryClicked },
        this.props.primaryText
      )
    );
  };

  return Footer;
}(_react2.default.Component);

Footer.propTypes = {
  primaryClicked: _react.PropTypes.func,
  secondaryClicked: _react.PropTypes.func,
  withSecondary: _react.PropTypes.bool,
  primaryText: _react.PropTypes.node,
  secondaryText: _react.PropTypes.node
};
exports.default = Footer;