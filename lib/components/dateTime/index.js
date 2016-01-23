'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _storeBuilder = require('./storeBuilder');

var _storeBuilder2 = _interopRequireDefault(_storeBuilder);

var _dropDown = require('./dropDown');

var _dropDown2 = _interopRequireDefault(_dropDown);

var _helpers = require('../../helpers');

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DateTime = function (_React$Component) {
  _inherits(DateTime, _React$Component);

  function DateTime(props) {
    _classCallCheck(this, DateTime);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.displayName = 'DateTime';
    _this.inputFocused = _this.inputFocused.bind(_this);
    _this.inputBlured = _this.inputBlured.bind(_this);
    _this.datePicked = _this.datePicked.bind(_this);
    _this.onTimeChanged = _this.onTimeChanged.bind(_this);

    _this.unsubscribe = null;
    return _this;
  }

  DateTime.prototype.componentWillMount = function componentWillMount() {
    // TODO: THIS. IS. SO. WRONG.
    if (this.props.value) {
      var nextValue = _moment2.default.isMoment(this.props.value) ? this.props.value : (0, _moment2.default)(this.props.value);

      this.store = (0, _storeBuilder2.default)(nextValue.clone(), nextValue);
    } else {
      this.store = (0, _storeBuilder2.default)((0, _moment2.default)());
    }

    this._subscribe();
  };

  DateTime.prototype._subscribe = function _subscribe() {
    var _this2 = this;

    if (this.unsubscribe) {
      this.unsubscribe();
    }

    this.unsubscribe = this.store.subscribe(function () {
      _this2.setState(_this2.store.getState());
    });

    this.setState(this.store.getState());
  };

  DateTime.prototype.componentWillUnmount = function componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  };

  DateTime.prototype.inputFocused = function inputFocused() {
    if (this.state.opened) {
      return;
    }
    this.store.dispatch(this.store.actions.open());
  };

  DateTime.prototype.datePicked = function datePicked(value) {
    var _store = this.store;
    var actions = _store.actions;
    var dispatch = _store.dispatch;

    dispatch(actions.setValue(value, false));
    // TODO: ???
    this.refs.input.blur();

    if (this.props.onChange) {
      this.props.onChange((0, _helpers.createEvent)(null, this, value));
    }
  };

  DateTime.prototype.inputBlured = function inputBlured(evt, id, originalEvent) {
    var _this3 = this;

    if (!this.state.opened) {
      return;
    }

    // TODO: this is wrong too, but out of my control.
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
      } else {
        // TODO: this might cause chaos and destruction in the future, remove.
        // this.refs.input.focus();
      }
    }, 1);
  };

  DateTime.prototype.getValue = function getValue() {
    return this.state.value;
  };

  DateTime.prototype.onTimeChanged = function onTimeChanged(value) {
    var _store2 = this.store;
    var actions = _store2.actions;
    var dispatch = _store2.dispatch;

    dispatch(actions.setValue(value));

    if (this.props.onChange) {
      this.props.onChange((0, _helpers.createEvent)(null, this, value));
    }
  };

  DateTime.prototype.setValue = function setValue(value) {
    var store = this.store;
    if (value) {
      if (_moment2.default.isMoment(value)) {
        store.dispatch(store.actions.setValue(value));
      } else {
        store.dispatch(store.actions.setValue((0, _moment2.default)(value)));
      }
    } else {
      store.dispatch(store.actions.setValue(null));
    }
    return value;
  };

  DateTime.prototype.render = function render() {
    var _state = this.state;
    var opened = _state.opened;
    var current = _state.current;
    var value = _state.value;
    var displayFormat = this.props.displayFormat;

    var displayer = value && value.format(displayFormat || "L LT");

    var label = null;

    if (this.props.label) {
      label = _react2.default.createElement(
        'label',
        null,
        this.props.label
      );
    }

    return _react2.default.createElement(
      'div',
      { className: 'form-group' },
      label,
      _react2.default.createElement(
        'div',
        { style: _styles2.default.root, ref: 'holder' },
        _react2.default.createElement('input', { style: _styles2.default.input,
          type: 'text',
          ref: 'input',
          className: 'form-control',
          value: displayer,
          readOnly: true,
          placeholder: this.props.placeholder || "Pick a Date",
          onFocus: this.inputFocused,
          onBlur: this.inputBlured }),
        _react2.default.createElement(
          'div',
          { style: _styles2.default.iconHolder },
          this.props.icon
        ),
        _react2.default.createElement(_dropDown2.default, { visible: opened, store: this.store, key: current.format("YYYY-MM"), onDatePicked: this.datePicked, onTimeChanged: this.onTimeChanged, showTime: this.props.time })
      )
    );
  };

  return DateTime;
}(_react2.default.Component);

DateTime.propTypes = {
  form: _react.PropTypes.string,
  displayFormat: _react.PropTypes.string,
  time: _react.PropTypes.bool
};
DateTime.defaultProps = {
  time: true
};
exports.default = (0, _helpers.modelize)(DateTime);