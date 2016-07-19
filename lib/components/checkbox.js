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

var _helpers = require('../helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * TODO: PropTypes
 * Isolate component from parent's model context.
 */

var CheckBox = function (_React$Component) {
  (0, _inherits3.default)(CheckBox, _React$Component);

  function CheckBox(props) {
    (0, _classCallCheck3.default)(this, CheckBox);

    var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this, props));

    _this.displayName = 'CheckBox';
    _this.oid = (0, _helpers.oid)();

    _this.onChange = _this.onChange.bind(_this);

    _this.state = {
      value: !!props.checked || false
    };
    return _this;
  }

  CheckBox.prototype.getValue = function getValue() {
    return this.state.value;
  };

  CheckBox.prototype.getImmediateValue = function getImmediateValue() {
    return !!this.refs.input.checked || false;
  };

  CheckBox.prototype.setValue = function setValue(value) {
    this.setState({
      value: value
    });
  };

  CheckBox.prototype.onChange = function onChange(evt) {
    var newValue = !!evt.target.checked || false;

    this.setValue(newValue);

    if (this.props.onChange) {
      this.props.onChange((0, _helpers.createEvent)(evt, this, newValue));
    }
  };

  CheckBox.prototype.render = function render() {
    var id = 'checkbox-' + this.oid;

    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement('input', {
        id: id,
        type: 'checkbox',
        className: 'caqui-checkbox',
        onChange: this.onChange,
        checked: !!this.state.value || false,
        ref: 'input' }),
      _react2.default.createElement(
        'label',
        { htmlFor: id, className: 'caqui-checkbox-label' },
        this.props.children
      )
    );
  };

  return CheckBox;
}(_react2.default.Component);

CheckBox.defaultProps = {
  label: null,
  placeholder: null
};
CheckBox.contextTypes = {
  caquiRelatedForm: _react2.default.PropTypes.string,
  caquiModel: _react2.default.PropTypes.any
};
exports.default = (0, _helpers.modelize)(CheckBox);