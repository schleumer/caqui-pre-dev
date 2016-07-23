'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _icon = require('./icon');

var _icon2 = _interopRequireDefault(_icon);

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * TODO: PropTypes
 */
var Panel = function (_Base) {
  (0, _inherits3.default)(Panel, _Base);

  function Panel(props) {
    (0, _classCallCheck3.default)(this, Panel);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Base.call(this, props));

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
        _react2.default.createElement(_icon2.default, {
          name: this.props.icon,
          style: { width: '30px', height: '30px', marginTop: '-10px', top: '5px', marginRight: '10px' } }),
        header
      );
    }

    var props = (0, _extends3.default)({
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