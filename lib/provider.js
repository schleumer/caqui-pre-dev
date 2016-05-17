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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Provider = function (_React$Component) {
    (0, _inherits3.default)(Provider, _React$Component);

    function Provider(props) {
        (0, _classCallCheck3.default)(this, Provider);
        return (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this, props));
    }

    Provider.prototype.getChildContext = function getChildContext() {
        return {};
    };

    Provider.prototype.render = function render() {
        return this.props.children;
    };

    return Provider;
}(_react2.default.Component);

Provider.childContextTypes = {};
exports.default = Provider;