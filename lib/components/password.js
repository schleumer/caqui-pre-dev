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

var _textInput = require('./textInput');

var _textInput2 = _interopRequireDefault(_textInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * TODO: PropTypes
 */
var Password = function (_TextInput) {
  (0, _inherits3.default)(Password, _TextInput);

  function Password() {
    (0, _classCallCheck3.default)(this, Password);
    return (0, _possibleConstructorReturn3.default)(this, _TextInput.apply(this, arguments));
  }

  return Password;
}(_textInput2.default);

Password.defaultProps = (0, _extends3.default)({}, _textInput2.default.defaultProps, {
  type: 'password'
});
exports.default = Password;