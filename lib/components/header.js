'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = function (_Base) {
  _inherits(Header, _Base);

  function Header(props) {
    _classCallCheck(this, Header);

    var _this = _possibleConstructorReturn(this, _Base.call(this, props));

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