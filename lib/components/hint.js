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

var _icon = require('./icon');

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * TODO: PropTypes
 */

var Hint = function (_React$Component) {
  (0, _inherits3.default)(Hint, _React$Component);

  function Hint(props) {
    (0, _classCallCheck3.default)(this, Hint);

    var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this, props));

    _this.displayName = 'Hint';
    return _this;
  }

  Hint.prototype.render = function render() {
    var text = this.props.text;


    if (!text) return null;

    return _react2.default.createElement(
      'span',
      null,
      _react2.default.createElement(
        'div',
        { className: 'caqui-form-control-hint' },
        _react2.default.createElement(_icon2.default, {
          name: 'help',
          className: 'hint-icon' }),
        _react2.default.createElement(
          'div',
          { className: 'hint' },
          text
        )
      )
    );
  };

  return Hint;
}(_react2.default.Component);

exports.default = Hint;