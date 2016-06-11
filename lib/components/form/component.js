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

var _base = require('../base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Component = function (_Base) {
  (0, _inherits3.default)(Component, _Base);

  function Component(props) {
    (0, _classCallCheck3.default)(this, Component);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Base.call(this, props));

    _this.displayName = 'Form.Component';
    return _this;
  }

  Component.prototype.getChildContext = function getChildContext() {
    return {
      caquiRelatedForm: this.props.name,
      caquiModel: this.props.model
    };
  };

  // walkThroughChildren(children) {
  //     return React.Children.map(children, this.relateWithForm.bind(this))
  // }

  // relateWithForm(child) {
  //     if (React.isValidElement(child)) {

  //         const props = {
  //             ...child.props
  //         }

  //         if (child.type.propTypes) {
  //             if (child.type.propTypes.relatedForm) {
  //                 props.relatedForm = this.props.name
  //                 if (this.props.model) {
  //                     props.model = this.props.model
  //                 }
  //             }
  //         }

  //         if (child.props.children && !child.type.__ignoreChildren) {
  //             if (Array.isArray(child.props.children)) {
  //                 return React.cloneElement(child, {
  //                     ...props,
  //                     children: this.walkThroughChildren(child.props.children)
  //                 })
  //             } else {
  //                 return React.cloneElement(child, {
  //                     ...props,
  //                     children: this.relateWithForm(child.props.children)
  //                 })
  //             }
  //         }

  //         return React.cloneElement(child, {
  //             ...props,
  //             relatedForm: this.props.name
  //         })
  //     }

  //     return child
  // }

  Component.prototype.render = function render() {
    return _react2.default.createElement(
      'div',
      null,
      'Form Component'
    );
  };

  return Component;
}(_base2.default);

Component.childContextTypes = {
  caquiRelatedForm: _react2.default.PropTypes.string,
  caquiModel: _react2.default.PropTypes.any
};
exports.default = Component;