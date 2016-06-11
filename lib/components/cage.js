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

/**
 * TODO: PropTypes
 * Isolate component from parent's model context.
 */

var Cage = function (_React$Component) {
  (0, _inherits3.default)(Cage, _React$Component);

  function Cage(props) {
    (0, _classCallCheck3.default)(this, Cage);

    var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this, props));

    _this.displayName = 'Cage';
    return _this;
  }

  Cage.prototype.getChildContext = function getChildContext() {
    return {
      caquiRelatedForm: null,
      caquiModel: null
    };
  };

  Cage.prototype.render = function render() {
    return this.props.children;
  };

  return Cage;
}(_react2.default.Component);

Cage.childContextTypes = {
  caquiRelatedForm: _react2.default.PropTypes.string,
  caquiModel: _react2.default.PropTypes.any
};
exports.default = Cage;