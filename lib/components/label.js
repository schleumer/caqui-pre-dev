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

var Label = function (_React$Component) {
  (0, _inherits3.default)(Label, _React$Component);

  function Label(props) {
    (0, _classCallCheck3.default)(this, Label);

    var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this, props));

    _this.displayName = 'Label';
    return _this;
  }

  Label.prototype.render = function render() {
    var _props = this.props;
    var text = _props.text;
    var hint = _props.hint;


    var hintBox = null;

    return _react2.default.createElement(
      'div',
      null,
      text,
      hintBox
    );
  };

  return Label;
}(_react2.default.Component);

exports.default = Label;