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

var Body = function (_React$Component) {
    (0, _inherits3.default)(Body, _React$Component);

    function Body() {
        (0, _classCallCheck3.default)(this, Body);
        return (0, _possibleConstructorReturn3.default)(this, _React$Component.apply(this, arguments));
    }

    Body.prototype.render = function render() {
        if (this.props.children) {}
        return _react2.default.createElement(
            "div",
            null,
            "Modal Body"
        );
    };

    return Body;
}(_react2.default.Component);

var Footer = function (_React$Component2) {
    (0, _inherits3.default)(Footer, _React$Component2);

    function Footer() {
        (0, _classCallCheck3.default)(this, Footer);
        return (0, _possibleConstructorReturn3.default)(this, _React$Component2.apply(this, arguments));
    }

    Footer.prototype.render = function render() {
        if (this.props.children) {
            //return ();
        }
        return _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(
                "button",
                { type: "button", className: "btn btn-default", "data-dismiss": "modal" },
                "Close"
            ),
            _react2.default.createElement(
                "button",
                { type: "button", className: "btn btn-primary" },
                "Save changes"
            )
        );
    };

    return Footer;
}(_react2.default.Component);

var Header = function (_React$Component3) {
    (0, _inherits3.default)(Header, _React$Component3);

    function Header() {
        (0, _classCallCheck3.default)(this, Header);
        return (0, _possibleConstructorReturn3.default)(this, _React$Component3.apply(this, arguments));
    }

    Header.prototype.render = function render() {
        if (this.props.children) {
            return _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(
                    "button",
                    { type: "button", className: "close", "data-dismiss": "modal", "aria-label": "Close" },
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
                { type: "button", className: "close", "data-dismiss": "modal", "aria-label": "Close" },
                _react2.default.createElement(
                    "span",
                    { "aria-hidden": "true" },
                    "×"
                )
            ),
            _react2.default.createElement(
                "h4",
                { className: "modal-title" },
                "Modal title"
            )
        );
    };

    return Header;
}(_react2.default.Component);

var Modal = function (_React$Component4) {
    (0, _inherits3.default)(Modal, _React$Component4);

    function Modal(props) {
        (0, _classCallCheck3.default)(this, Modal);

        var _this4 = (0, _possibleConstructorReturn3.default)(this, _React$Component4.call(this, props));

        _this4.displayName = 'Modal';
        return _this4;
    }

    Modal.prototype.getHeader = function getHeader(children) {
        if (Array.isArray(children)) {
            var el = children.filter(function (comp) {
                return comp.type.name == 'Header';
            }).shift();
            if (el) {
                return el;
            }
        }
        return _react2.default.createElement(Header, null);
    };

    Modal.prototype.getBody = function getBody(children) {
        if (Array.isArray(children)) {
            var el = children.filter(function (comp) {
                return comp.type.name == 'Body';
            }).shift();
            if (el) {
                return el;
            }
        }
        return _react2.default.createElement(Body, null);
    };

    Modal.prototype.getFooter = function getFooter(children) {
        if (Array.isArray(children)) {
            var el = children.filter(function (comp) {
                return comp.type.name == 'Footer';
            }).shift();
            if (el) {
                return el;
            }
        }
        return _react2.default.createElement(Footer, null);
    };

    Modal.prototype.render = function render() {
        var style = {
            overflow: 'auto'
        };

        var children = this.props.children;


        var header = this.getHeader(children);
        var body = this.getBody(children);
        var footer = this.getFooter(children);

        return _react2.default.createElement(
            "div",
            { style: { display: this.props.isVisible ? 'block' : 'none' } },
            _react2.default.createElement("div", { className: "modal-backdrop fade in" }),
            _react2.default.createElement(
                "div",
                { className: "modal show", tabindex: "-1", role: "dialog", style: style },
                _react2.default.createElement(
                    "div",
                    { className: "modal-dialog" },
                    _react2.default.createElement(
                        "div",
                        { className: "modal-content" },
                        _react2.default.createElement(
                            "div",
                            { className: "modal-header" },
                            header
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "modal-body" },
                            body
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "modal-footer" },
                            footer
                        )
                    )
                )
            )
        );
    };

    return Modal;
}(_react2.default.Component);

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

exports.default = Modal;