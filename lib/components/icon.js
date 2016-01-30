'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Icon = function (_Base) {
  _inherits(Icon, _Base);

  function Icon(props) {
    _classCallCheck(this, Icon);

    var _this = _possibleConstructorReturn(this, _Base.call(this, props));

    _this.displayName = 'Icon';
    return _this;
  }

  Icon.prototype.render = function render() {
    var style = _extends({
      width: '16px',
      height: '16px',
      verticalAlign: 'text-bottom',
      position: 'relative'
    }, this.props.style);
    var classNames = (0, _classnames2.default)("caqui-icon", this.props.className);

    var name = this.props.name;

    // special icon ;)
    if (name == 'backward') {
      name = 'forward';
      style.transform = 'rotate(180deg)';
    } else if (name == 'sign-out') {
      name = 'sign-in';
      style.transform = 'rotate(180deg)';
    }

    return _react2.default.createElement(
      'svg',
      { className: classNames, style: style },
      _react2.default.createElement('use', { xlinkHref: "#icon-" + name })
    );
  };

  return Icon;
}(_base2.default);

exports.default = Icon;