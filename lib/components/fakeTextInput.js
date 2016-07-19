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

var _form = require('./form');

var _form2 = _interopRequireDefault(_form);

var _alertBox = require('./alertBox');

var _alertBox2 = _interopRequireDefault(_alertBox);

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _helpers = require('../helpers');

var _system = require('../system');

var system = _interopRequireWildcard(_system);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/// XXX: ?????????????
var objectId = 1;

var FakeTextInput = function (_Base) {
  (0, _inherits3.default)(FakeTextInput, _Base);

  function FakeTextInput(props) {
    (0, _classCallCheck3.default)(this, FakeTextInput);

    // just for control

    var _this = (0, _possibleConstructorReturn3.default)(this, _Base.call(this, props));

    _this.objectId = objectId++;

    _this.displayName = 'FakeTextInput';

    _this.state = {
      value: null
    };

    _this.onChange = _this.onChange.bind(_this);

    _this.inputDebounce = null;
    return _this;
  }

  FakeTextInput.prototype.onChange = function onChange(evt) {
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

  FakeTextInput.prototype.getValue = function getValue() {
    return this.state.value;
  };

  FakeTextInput.prototype.getImmediateValue = function getImmediateValue() {
    return this.refs.input.value;
  };

  FakeTextInput.prototype.setValue = function setValue(value) {
    this.setState({
      value: value,
      focused: false
    });
  };

  FakeTextInput.prototype.makeId = function makeId(props) {
    var nextId = [props.caquiRelatedForm, props.name].filter(function (x) {
      return !!x;
    });
    if (nextId.length) {
      this.id = nextId.join('.');
    } else {
      this.id = null;
    }
  };

  FakeTextInput.prototype.componentWillReceiveProps = function componentWillReceiveProps(props) {
    this.setState({
      value: props.value
    });
    this.makeId(props);
  };

  FakeTextInput.prototype.componentWillMount = function componentWillMount() {
    this.setState({
      value: this.props.value
    });
    this.makeId(this.props);
  };

  FakeTextInput.prototype.focus = function focus() {
    this.refs.input.focus();
  };

  FakeTextInput.prototype.blur = function blur() {
    this.refs.input.blur();
  };

  FakeTextInput.prototype.render = function render() {
    var props = this.props;
    var label = props.label;
    var placeholder = props.placeholder;


    var alertBox = null;

    if (this.id) {
      alertBox = _react2.default.createElement(_alertBox2.default, {
        silence: true,
        namespace: this.id });
    }

    var placeholderEl = _react2.default.createElement(
      'span',
      { className: 'caqui-fake-text-input-placeholder' },
      placeholder || label
    );

    return _react2.default.createElement(
      _form2.default.Group,
      props,
      label && _react2.default.createElement(
        'label',
        null,
        label
      ),
      _react2.default.createElement(
        'div',
        {
          className: 'caqui-fake-text-input',
          tabIndex: props.tabIndex || '0',
          ref: 'input' },
        this.state.value || this.props.children || placeholderEl
      ),
      alertBox
    );
  };

  return FakeTextInput;
}(_base2.default);

FakeTextInput.propTypes = {
  label: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.element]),
  placeholder: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.element])
};
FakeTextInput.defaultProps = {
  label: null,
  placeholder: null
};
exports.default = (0, _helpers.modelize)(FakeTextInput);