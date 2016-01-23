'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _alertBox = require('../alertBox');

var _alertBox2 = _interopRequireDefault(_alertBox);

var _component = require('./component');

var _component2 = _interopRequireDefault(_component);

var _group = require('./group');

var _group2 = _interopRequireDefault(_group);

var _footer = require('./footer');

var _footer2 = _interopRequireDefault(_footer);

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Form = function (_Component) {
  _inherits(Form, _Component);

  function Form(props) {
    _classCallCheck(this, Form);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.displayName = 'Form';
    _this.created = new Date();

    _this.submit = _this.submit.bind(_this);
    _this.undo = _this.undo.bind(_this);
    return _this;
  }

  Form.prototype.submit = function submit(e) {
    e.preventDefault();

    this.props.onSubmit && this.props.onSubmit(e);
  };

  Form.prototype.undo = function undo() {
    var model = this.props.model;

    if (model) {
      model.undo();
    }
  };

  Form.prototype.render = function render() {
    console.log("Form rendered");

    var children = this.props.children;

    if (Array.isArray(children)) {
      children = this.walkThroughChildren(children);
    } else {
      children = this.walkThroughChildren([children]);
    }

    var props = _extends({
      onSubmit: this.submit
    }, this.props);

    return _react2.default.createElement(
      'form',
      props,
      _react2.default.createElement(_alertBox2.default, { namespace: this.props.name }),
      children
    );
  };

  return Form;
}(_component2.default);

Form.Group = _group2.default;
Form.Footer = _footer2.default;

exports.default = Form;