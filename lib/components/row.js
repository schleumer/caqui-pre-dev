'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Row = function (_Base) {
  (0, _inherits3.default)(Row, _Base);

  function Row(props) {
    (0, _classCallCheck3.default)(this, Row);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Base.call(this, props));

    _this.displayName = 'Row';
    return _this;
  }

  Row.prototype.render = function render() {
    // @todo coding style
    var className = [this.props.fluid ? "row-fluid" : "row"];

    if (this.props.className) {
      className.push(this.props.className);
    }

    return _react2.default.createElement(
      'div',
      (0, _extends3.default)({}, this.props, { className: className.join(' '), style: (0, _extends3.default)({}, this.props.style) }),
      this.props.children
    );
  };

  return Row;
}(_base2.default);

exports.default = Row;