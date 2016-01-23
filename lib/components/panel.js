'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _icon = require('./icon');

var _icon2 = _interopRequireDefault(_icon);

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Panel = function (_Base) {
  _inherits(Panel, _Base);

  function Panel(props) {
    _classCallCheck(this, Panel);

    var _this = _possibleConstructorReturn(this, _Base.call(this, props));

    _this.displayName = 'Panel';
    return _this;
  }

  Panel.prototype.render = function render() {
    // TODO stuffs
    var header = this.props.header;

    var className = ['panel', this.props.type ? 'panel-' + this.props.type : 'panel-default'];

    if (this.props.className) {
      className.push(this.props.className);
    }

    if (this.props.icon) {
      header = _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_icon2.default, { name: this.props.icon, style: { width: '30px', height: '30px', marginTop: '-10px', top: '5px', marginRight: '10px' } }),
        header
      );
    }

    var props = _extends({
      className: className.join(' ')
    }, this.props);

    return _react2.default.createElement(
      'div',
      props,
      _react2.default.createElement(
        'div',
        { className: 'panel-heading' },
        header
      ),
      _react2.default.createElement(
        'div',
        { className: 'panel-body' },
        this.props.children
      )
    );
  };

  return Panel;
}(_base2.default);

exports.default = Panel;