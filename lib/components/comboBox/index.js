'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _helpers = require('../../helpers');

var _form = require('../form');

var _form2 = _interopRequireDefault(_form);

var _storeBuilder = require('./storeBuilder');

var _storeBuilder2 = _interopRequireDefault(_storeBuilder);

var _shadow = require('./shadow');

var _shadow2 = _interopRequireDefault(_shadow);

var _dropDown = require('./dropDown');

var _dropDown2 = _interopRequireDefault(_dropDown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ComboBox = function (_React$Component) {
  _inherits(ComboBox, _React$Component);

  function ComboBox(props) {
    _classCallCheck(this, ComboBox);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.displayName = 'ComboBox';

    // sorry, world.
    _this.unsafeUnmounted = false;

    _this.store = (0, _storeBuilder2.default)(props.adapter);

    _this.onDropDownBlur = _this.onDropDownBlur.bind(_this);
    _this.onDropDownChange = _this.onDropDownChange.bind(_this);
    return _this;
  }

  ComboBox.prototype.componentWillMount = function componentWillMount() {
    var _this2 = this;

    var store = this.store;
    store.subscribe(function () {
      if (_this2.unsafeUnmounted) {
        return;
      }
      _this2.setState(store.getState());
    });
    this.setState(store.getState());
  };

  ComboBox.prototype.getValue = function getValue() {
    return this.state.selected;
  };

  ComboBox.prototype.setValue = function setValue(value) {
    var store = this.store;
    store.dispatch(store.actions.select(value));
    return value;
  };

  ComboBox.prototype.onDropDownChange = function onDropDownChange(item) {
    var store = this.store;

    store.dispatch(store.actions.select(item));

    this.props.onChange && this.props.onChange((0, _helpers.createEvent)(null, this, item));
    this.refs.shadow.unfocus();
    //this.store.dispatch(actions.close());
  };

  ComboBox.prototype.onDropDownBlur = function onDropDownBlur(evt, id, originalEvent) {
    var _this3 = this;

    // SORRY, WORLD :(
    // https://github.com/facebook/react/issues/2011
    setTimeout(function () {
      var actions = _this3.store.actions;

      var relatedTarget = evt.relatedTarget || originalEvent.relatedTarget || document.activeElement;

      var holderDom = _this3.refs.holder,
          a = relatedTarget,
          b = a && holderDom.contains(a);

      if (!b) {
        _this3.store.dispatch(actions.close());
        _this3.refs.shadow.unfocus();
      } else {
        _this3.store.dispatch(actions.open());
      }
    }, 1);
  };

  ComboBox.prototype.render = function render() {
    var data = this.state;

    var _props = this.props;
    var itemKey = _props.itemKey;
    var itemLabel = _props.itemLabel;
    var className = _props.className;

    var classNames = (0, _classnames2.default)('caqui-combobox', 'caqui-combobox-holder', className);

    var dropdown = null;
    var label = null;

    if (this.props.label) {
      label = _react2.default.createElement(
        'label',
        null,
        this.props.label
      );
    }

    var childProps = {
      itemKey: itemKey,
      itemLabel: itemLabel,
      store: this.store
    };

    if (data.open) {
      dropdown = _react2.default.createElement(_dropDown2.default, _extends({}, childProps, { onBlur: this.onDropDownBlur, onChange: this.onDropDownChange }));
    }

    return _react2.default.createElement(
      _form2.default.Group,
      null,
      label,
      _react2.default.createElement(
        'div',
        _extends({}, this.props, { className: classNames, ref: 'holder' }),
        _react2.default.createElement(_shadow2.default, _extends({}, childProps, { ref: 'shadow' })),
        dropdown
      )
    );
  };

  return ComboBox;
}(_react2.default.Component);

ComboBox.propTypes = {
  form: _react.PropTypes.string
};
ComboBox.defaultProps = {
  itemKey: function itemKey(_) {
    return _.id;
  },
  itemLabel: function itemLabel(_) {
    return _.name;
  }
};
exports.default = (0, _helpers.modelize)(ComboBox);