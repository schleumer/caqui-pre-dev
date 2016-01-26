'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _form = require('./form');

var _form2 = _interopRequireDefault(_form);

var _alertBox = require('./alertBox');

var _alertBox2 = _interopRequireDefault(_alertBox);

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _helpers = require('../helpers');

var _system = require('../system');

var system = _interopRequireWildcard(_system);

var _styles = require('../styles');

var Styles = _interopRequireWildcard(_styles);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

console.log(Styles);
var styles = Styles.textInput;

var objectId = 1;

var TextInput = function (_Base) {
  _inherits(TextInput, _Base);

  function TextInput(props) {
    _classCallCheck(this, TextInput);

    // just for control

    var _this = _possibleConstructorReturn(this, _Base.call(this, props));

    _this.objectId = objectId++;

    _this.displayName = 'TextInput';
    _this.state = {
      value: null
    };

    _this.onChange = _this.onChange.bind(_this);

    _this.inputDebounce = null;
    return _this;
  }

  TextInput.prototype.onChange = function onChange(evt) {
    var _this2 = this;

    var newValue = evt.target.value;

    this.setValue(newValue);

    if (this.inputDebounce) {
      clearTimeout(this.inputDebounce);
    }

    // to avoid junk throw
    // TODO: maybe a helper for debounce would be cool
    this.inputDebounce = setTimeout(function () {
      if (_this2.props.onChange) {
        _this2.props.onChange((0, _helpers.createEvent)(evt, _this2, newValue));
      }
    }, system.bounceTime);
  };

  TextInput.prototype.getValue = function getValue() {
    return this.state.value;
  };

  TextInput.prototype.getImmediateValue = function getImmediateValue() {
    return this.refs.input.value;
  };

  TextInput.prototype.setValue = function setValue(value) {
    this.setState({
      value: value
    });
  };

  TextInput.prototype.makeId = function makeId(props) {
    var nextId = [props.form, props.name].filter(function (x) {
      return !!x;
    });
    if (nextId.length) {
      this.id = nextId.join('.');
    } else {
      this.id = null;
    }
  };

  TextInput.prototype.componentWillReceiveProps = function componentWillReceiveProps(props) {
    this.makeId(props);
  };

  TextInput.prototype.componentWillMount = function componentWillMount() {
    this.state.value = this.props.value || null;
    this.makeId(this.props);
  };

  TextInput.prototype.focus = function focus() {
    this.refs.input.focus();
  };

  TextInput.prototype.render = function render() {
    // @todo helper
    var label = this.props.label || null;
    var placeholder = this.props.placeholder || label;
    var style = _extends({}, styles.normal, this.props.style);
    var props = this.props;

    var alertBox = null;

    if (this.id) {
      alertBox = _react2.default.createElement(_alertBox2.default, { silence: true, namespace: this.id });
    }

    return _react2.default.createElement(
      _form2.default.Group,
      null,
      label && _react2.default.createElement(
        'label',
        { style: styles.label },
        label
      ),
      _react2.default.createElement('input', _extends({}, props, {
        type: 'text',
        style: style,
        placeholder: placeholder,
        onChange: this.onChange,
        value: this.state.value,
        ref: 'input' })),
      alertBox
    );
  };

  return TextInput;
}(_base2.default);

TextInput.propTypes = {
  form: _react.PropTypes.string
};
exports.default = (0, _helpers.modelize)(TextInput);