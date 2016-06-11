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

var _helpers = require('../helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * TODO: PropTypes
 */

var Picker = function (_React$Component) {
  (0, _inherits3.default)(Picker, _React$Component);

  function Picker(props) {
    (0, _classCallCheck3.default)(this, Picker);

    var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this, props));

    _this.displayName = 'Picker';

    _this.state = {
      value: null
    };
    return _this;
  }

  Picker.prototype.getValue = function getValue() {
    return this.state.value;
  };

  Picker.prototype.getImmediateValue = function getImmediateValue() {
    return this.state.value || null;
  };

  Picker.prototype.setValue = function setValue(value) {
    this.setState({
      value: value
    });
  };

  Picker.prototype.render = function render() {
    return _react2.default.createElement(
      'div',
      null,
      'Picker'
    );
  };

  return Picker;
}(_react2.default.Component);

exports.default = (0, _helpers.modelize)(Picker);