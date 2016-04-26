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

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tab = function (_Base) {
  (0, _inherits3.default)(Tab, _Base);

  function Tab(props) {
    (0, _classCallCheck3.default)(this, Tab);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Base.call(this, props));

    _this.displayName = 'Tab';
    return _this;
  }

  Tab.prototype.render = function render() {
    return _react2.default.createElement(
      'div',
      { style: { paddingTop: '20px' } },
      this.props.children
    );
  };

  return Tab;
}(_base2.default);

exports.default = Tab;