'use strict';

exports.__esModule = true;

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

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

var ModelDump = function (_React$Component) {
  (0, _inherits3.default)(ModelDump, _React$Component);

  function ModelDump(props) {
    (0, _classCallCheck3.default)(this, ModelDump);

    var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this, props));

    _this.displayName = 'ModelDump';
    _this.state = {
      value: null
    };
    return _this;
  }

  ModelDump.prototype.setValue = function setValue(value) {
    this.setState({
      value: value
    });
  };

  ModelDump.prototype.getValue = function getValue() {
    return null;
  };

  ModelDump.prototype.render = function render() {
    return _react2.default.createElement(
      'pre',
      null,
      (0, _stringify2.default)(this.state.value, null, 2)
    );
  };

  return ModelDump;
}(_react2.default.Component);

ModelDump.contextTypes = {
  caquiRelatedForm: _react.PropTypes.string
};
exports.default = (0, _helpers.modelize)(ModelDump);