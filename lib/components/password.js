'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _form = require('./form');

var _form2 = _interopRequireDefault(_form);

var _alertBox = require('./alertBox');

var _alertBox2 = _interopRequireDefault(_alertBox);

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextInput = function (_Base) {
  _inherits(TextInput, _Base);

  function TextInput(props) {
    _classCallCheck(this, TextInput);

    var _this = _possibleConstructorReturn(this, _Base.call(this, props));

    _this.displayName = 'TextInput';
    _this.state = {
      value: null
    };

    _this.onChange = _this.onChange.bind(_this);
    return _this;
  }

  TextInput.prototype.onChange = function onChange(evt) {
    this.setState({
      value: evt.target.value
    });

    if (this.props.onChange) {
      this.props.onChange(evt);
    }
  };

  TextInput.prototype.getValue = function getValue() {
    return this.state.value;
  };

  TextInput.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var nextId = [nextProps.form, nextProps.name].filter(function (x) {
      return !!x;
    });
    if (nextId.length) {
      this.id = nextId.join('.');
    } else {
      this.id = null;
    }
  };

  TextInput.prototype.componentWillMount = function componentWillMount() {
    this.state.value = this.props.value || null;
  };

  TextInput.prototype.render = function render() {
    // @todo helper
    var label = this.props.label || null;
    var placeholder = this.props.placeholder || label;
    var alertBox = null;

    if (this.id) {
      alertBox = _react2.default.createElement(_alertBox2.default, { silence: true, namespace: this.id });
    }

    return _react2.default.createElement(
      _form2.default.Group,
      null,
      label && _react2.default.createElement(
        'label',
        null,
        label
      ),
      _react2.default.createElement('input', { type: 'password', className: 'form-control', placeholder: placeholder, onChange: this.onChange, value: this.state.value }),
      alertBox
    );
  };

  return TextInput;
}(_base2.default);

exports.default = TextInput;