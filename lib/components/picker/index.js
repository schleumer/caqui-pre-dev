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

var Tooltip = function (_React$Component) {
  (0, _inherits3.default)(Tooltip, _React$Component);

  function Tooltip() {
    (0, _classCallCheck3.default)(this, Tooltip);
    return (0, _possibleConstructorReturn3.default)(this, _React$Component.apply(this, arguments));
  }

  Tooltip.prototype.render = function render() {
    return this.props.children;
  };

  return Tooltip;
}(_react2.default.Component);

/**
 * TODO: PropTypes
 */


var Picker = function (_React$Component2) {
  (0, _inherits3.default)(Picker, _React$Component2);

  function Picker(props) {
    (0, _classCallCheck3.default)(this, Picker);

    var _this2 = (0, _possibleConstructorReturn3.default)(this, _React$Component2.call(this, props));

    _this2.displayName = 'Picker';

    _this2.unsafeUnmounted = false;
    _this2.store = (0, _storeBuilder2.default)(props.adapter, props.valuedBy, props.itemKey);

    _this2.state = {
      value: null
    };

    _this2.toggleModal = _this2.toggleModal.bind(_this2);
    _this2.onChange = _this2.onChange.bind(_this2);
    _this2.onConfirm = _this2.onConfirm.bind(_this2);
    return _this2;
  }

  Picker.prototype.componentWillMount = function componentWillMount() {
    var _this3 = this;

    var store = this.store;
    store.subscribe(function () {
      if (_this3.unsafeUnmounted) {
        return;
      }

      var newState = store.getState();

      _this3.setState(newState);
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


    var choosen = [];

    if (Array.isArray(this.state.value)) {
      choosen = this.state.value.map(function (item) {
        return _react2.default.createElement(
          Tooltip,
          { content: "Okok" },
          _react2.default.createElement(
            _button2.default,
            { style: { marginRight: 4 },
              className: 'caqui-picker-showcase-button' },
            props.itemLabel(item)
          )
        );
      });
    }

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
        choosen,
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