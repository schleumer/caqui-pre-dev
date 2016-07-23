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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * TODO: PropTypes
 */
var Container = function (_Base) {
  (0, _inherits3.default)(Container, _Base);

  function Container(props) {
    (0, _classCallCheck3.default)(this, Container);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Base.call(this, props));

    _this.displayName = 'Container';
    return _this;
  }

  Container.prototype.render = function render() {
    // @todo coding style

    var classes = (0, _classnames2.default)(this.props.className, {
      'caqui-container': !this.props.fluid,
      'caqui-container-fluid': this.props.fluid
    });

    return _react2.default.createElement(
      'div',
      (0, _extends3.default)({}, this.props, {
        className: classes }),
      this.props.children
    );
  };

  return Container;
}(_base2.default);

exports.default = Container;