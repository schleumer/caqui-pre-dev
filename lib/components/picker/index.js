'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

var _form = require('../form');

var _form2 = _interopRequireDefault(_form);

var _label = require('../label');

var _label2 = _interopRequireDefault(_label);

var _helpers = require('../../helpers');

var _modal = require('./modal');

var _modal2 = _interopRequireDefault(_modal);

var _storeBuilder = require('./storeBuilder');

var _storeBuilder2 = _interopRequireDefault(_storeBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * TODO: PropTypes
 */
var Picker = function (_React$Component) {
  (0, _inherits3.default)(Picker, _React$Component);

  function Picker(props) {
    (0, _classCallCheck3.default)(this, Picker);

    var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this, props));

    _this.displayName = 'Picker';

    _this.unsafeUnmounted = false;
    _this.store = (0, _storeBuilder2.default)(props.adapter, props.valuedBy, props.itemKey);

    _this.state = {
      value: null
    };

    _this.toggleModal = _this.toggleModal.bind(_this);
    _this.onChange = _this.onChange.bind(_this);
    _this.onConfirm = _this.onConfirm.bind(_this);
    return _this;
  }

  Picker.prototype.componentWillMount = function componentWillMount() {
    var _this2 = this;

    var store = this.store;
    store.subscribe(function () {
      if (_this2.unsafeUnmounted) {
        return;
      }

      var newState = store.getState();

      _this2.setState(newState);
    });
    store.touch();
  };

  Picker.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    this.store = (0, _storeBuilder2.default)(nextProps.adapter, nextProps.valuedBy, nextProps.itemKey);
  };

  Picker.prototype.getValue = function getValue() {
    return this.state.value;
  };

  Picker.prototype.getImmediateValue = function getImmediateValue() {
    return this.state.value || null;
  };

  Picker.prototype.setValue = function setValue(value) {
    this.store.update(value);
    this.setState({ value: value });
  };

  Picker.prototype.toggleModal = function toggleModal() {
    //this.setState({ isModalVisible: !this.state.isModalVisible })
    this.store.toggleModal();
  };

  Picker.prototype.onChange = function onChange() {};

  Picker.prototype.onConfirm = function onConfirm() {
    var store = this.store;
    var newState = store.getState();
    this.props.onChange && this.props.onChange((0, _helpers.createEvent)(null, this, newState.checked));
    this.setState({ value: newState.checked });
    this.store.hideModal();
  };

  Picker.prototype.render = function render() {
    var props = (0, _extends3.default)({}, this.props);
    var label = props.label;


    return _react2.default.createElement(
      _form2.default.Group,
      null,
      _react2.default.createElement(_label2.default, { text: label, hint: "gtfo" }),
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_modal2.default, {
          isVisible: this.state.isModalVisible,
          adapter: this.store,
          onClose: this.toggleModal,
          itemLabel: this.props.itemLabel,
          itemKey: this.props.itemKey,
          items: this.state.items,
          indexedItems: this.state.index,
          checkedItems: this.state.checked,
          onChange: this.onChange,
          onConfirm: this.onConfirm }),
        _react2.default.createElement(
          _button2.default,
          { onClick: this.toggleModal },
          'Selecionar'
        )
      )
    );
  };

  return Picker;
}(_react2.default.Component);

Picker.contextTypes = {
  caquiRelatedForm: _react.PropTypes.string,
  caquiModel: _react.PropTypes.any
};
Picker.propTypes = {
  adapter: _react.PropTypes.any
};
Picker.defaultProps = {
  itemKey: function itemKey(_) {
    return _.id;
  },
  itemLabel: function itemLabel(_) {
    return _.name;
  },
  valuedBy: function valuedBy(_) {
    return _;
  }
};
exports.default = (0, _helpers.modelize)(Picker);