'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _isRequiredForA11y = require('react-prop-types/lib/isRequiredForA11y');

var _isRequiredForA11y2 = _interopRequireDefault(_isRequiredForA11y);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tooltip = function (_React$Component) {
  (0, _inherits3.default)(Tooltip, _React$Component);

  function Tooltip() {
    (0, _classCallCheck3.default)(this, Tooltip);
    return (0, _possibleConstructorReturn3.default)(this, _React$Component.apply(this, arguments));
  }

  Tooltip.prototype.render = function render() {
    var _classes;

    var _props = this.props;
    var placement = _props.placement;
    var positionTop = _props.positionTop;
    var positionLeft = _props.positionLeft;
    var arrowOffsetTop = _props.arrowOffsetTop;
    var arrowOffsetLeft = _props.arrowOffsetLeft;
    var className = _props.className;
    var style = _props.style;
    var children = _props.children;
    var props = (0, _objectWithoutProperties3.default)(_props, ['placement', 'positionTop', 'positionLeft', 'arrowOffsetTop', 'arrowOffsetLeft', 'className', 'style', 'children']);

    //const [ bsProps, elementProp ] = splitBsProps(props);

    var classes = (_classes = {
      'tooltip': true
    }, _classes[placement] = true, _classes);

    var outerStyle = (0, _extends3.default)({
      top: positionTop,
      left: positionLeft
    }, style);

    var arrowStyle = {
      top: arrowOffsetTop,
      left: arrowOffsetLeft
    };

    return _react2.default.createElement(
      'div',
      (0, _extends3.default)({}, props, {
        role: 'tooltip',
        className: (0, _classnames2.default)(className, classes),
        style: outerStyle
      }),
      _react2.default.createElement('div', { className: 'tooltip-arrow', style: arrowStyle }),
      _react2.default.createElement(
        'div',
        { className: 'tooltip-inner' },
        children
      )
    );
  };

  return Tooltip;
}(_react2.default.Component);

Tooltip.propTypes = {
  /**
   * An html id attribute, necessary for accessibility
   * @type {string|number}
   * @required
   */
  id: (0, _isRequiredForA11y2.default)(_react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number])),

  /**
   * Sets the direction the Tooltip is positioned towards.
   */
  placement: _react2.default.PropTypes.oneOf(['top', 'right', 'bottom', 'left']),

  /**
   * The "top" position value for the Tooltip.
   */
  positionTop: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.number, _react2.default.PropTypes.string]),
  /**
   * The "left" position value for the Tooltip.
   */
  positionLeft: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.number, _react2.default.PropTypes.string]),

  /**
   * The "top" position value for the Tooltip arrow.
   */
  arrowOffsetTop: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.number, _react2.default.PropTypes.string]),
  /**
   * The "left" position value for the Tooltip arrow.
   */
  arrowOffsetLeft: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.number, _react2.default.PropTypes.string])
};
Tooltip.defaultProps = {
  placement: 'right'
};
exports.default = Tooltip;