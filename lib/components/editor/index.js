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

var CaquiEditor = function (_Component) {
  (0, _inherits3.default)(CaquiEditor, _Component);

  function CaquiEditor() {
    (0, _classCallCheck3.default)(this, CaquiEditor);
    return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
  }

  CaquiEditor.prototype.render = function render() {
    return _react2.default.createElement(
      'div',
      null,
      'CaquiEditor'
    );
  };

  return CaquiEditor;
}(_react.Component);

CaquiEditor.propTypes = {
  onChange: _react.PropTypes.func
};
exports.default = CaquiEditor;