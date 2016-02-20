'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Header = function (_Base) {
  (0, _inherits3.default)(Header, _Base);

  function Header(props) {
    (0, _classCallCheck3.default)(this, Header);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Base.call(this, props));

    _this.displayName = 'Header';
    return _this;
  }

  Header.prototype.render = function render() {
    var size = this.props.size || 'default';
    var el = undefined;
    switch (size) {
      case Header.Primary:
        el = _react2.default.createElement(
          'h1',
          null,
          this.props.children
        );
        break;
      case Header.Secondary:
      default:
        el = _react2.default.createElement(
          'h2',
          null,
          this.props.children
        );
    }
    return el;
  };

  return Header;
}(_base2.default);

Header.Primary = "primary";
Header.Secondary = "secondary";

exports.default = Header;