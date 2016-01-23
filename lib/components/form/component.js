'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _base = require('../base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Component = function (_Base) {
  _inherits(Component, _Base);

  function Component(props) {
    _classCallCheck(this, Component);

    var _this = _possibleConstructorReturn(this, _Base.call(this, props));

    _this.displayName = 'Form.Component';
    return _this;
  }

  Component.prototype.walkThroughChildren = function walkThroughChildren(children) {
    return _react2.default.Children.map(children, this.relateWithForm.bind(this));
  };

  Component.prototype.relateWithForm = function relateWithForm(child) {
    if (_react2.default.isValidElement(child)) {

      var props = _extends({}, child.props);

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
          return _react2.default.cloneElement(child, _extends({}, props, {
            children: this.walkThroughChildren(child.props.children)
          }));
        } else {
          return _react2.default.cloneElement(child, _extends({}, props, {
            children: this.relateWithForm(child.props.children)
          }));
        }
      }

      return _react2.default.cloneElement(child, _extends({}, props, {
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