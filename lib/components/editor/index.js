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

var _megadraft = require('megadraft');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CaquiEditor = function (_React$Component) {
  (0, _inherits3.default)(CaquiEditor, _React$Component);

  function CaquiEditor(props) {
    (0, _classCallCheck3.default)(this, CaquiEditor);

    var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this, props));

    _this.state = { editorState: (0, _megadraft.editorStateFromRaw)(null) };
    _this.onChange = _this.onChange.bind(_this);
    return _this;
  }

  CaquiEditor.prototype.onChange = function onChange(editorState) {
    this.setState({ editorState: editorState });
  };

  CaquiEditor.prototype.render = function render() {
    return _react2.default.createElement(_megadraft.MegadraftEditor, {
      placeholder: 'Digite seu texto aqui',
      editorState: this.state.editorState,
      onChange: this.onChange });
  };

  return CaquiEditor;
}(_react2.default.Component);

exports.default = CaquiEditor;