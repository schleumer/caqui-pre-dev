'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _menu = require('./menu');

var _menu2 = _interopRequireDefault(_menu);

var _base = require('../../base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Container = function (_Base) {
  (0, _inherits3.default)(Container, _Base);

  function Container(props) {
    (0, _classCallCheck3.default)(this, Container);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Base.call(this, props));

    _this.displayName = 'Page.Container';
    return _this;
  }

  Container.prototype.render = function render() {
    return _react2.default.createElement(
      'div',
      { className: 'caqui-page-container' },
      this.props.children
    );
  };

  return Container;
}(_base2.default);

Container.Menu = _menu2.default;

exports.default = Container;