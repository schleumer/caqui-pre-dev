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

  Component.prototype.walkThroughChildren = function walkThroughChildren(children) {
    return _react2.default.Children.map(children, this.relateWithForm.bind(this));
  };

  Component.prototype.relateWithForm = function relateWithForm(child) {
    if (_react2.default.isValidElement(child)) {

      var props = (0, _extends3.default)({}, child.props);

      if (child.type.propTypes) {
        if (child.type.propTypes.form) {
          props.form = this.props.name;
          if (this.props.model) {
            props.model = this.props.model;
          }
        }
      }

      if (child.props.children && !child.type.__ignoreChildren) {
        if (Array.isArray(child.props.children)) {
          return _react2.default.cloneElement(child, (0, _extends3.default)({}, props, {
            children: this.walkThroughChildren(child.props.children)
          }));
        } else {
          return _react2.default.cloneElement(child, (0, _extends3.default)({}, props, {
            children: this.relateWithForm(child.props.children)
          }));
        }
      }

      return _react2.default.cloneElement(child, (0, _extends3.default)({}, props, {
        form: this.props.name
      }));
    }

    return child;
  };

  Component.prototype.render = function render() {
    return _react2.default.createElement(
      'div',
      null,
      'Form Component'
    );
  };

  return Component;
}(_base2.default);

exports.default = Component;