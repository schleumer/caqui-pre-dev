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

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _storeBuilder = require('./storeBuilder');

var _storeBuilder2 = _interopRequireDefault(_storeBuilder);

var _dropDown = require('./dropDown');

var _dropDown2 = _interopRequireDefault(_dropDown);

var _helpers = require('../../helpers');

var _fakeTextInput = require('../fakeTextInput');

var _fakeTextInput2 = _interopRequireDefault(_fakeTextInput);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DateTime = function (_React$Component) {
  (0, _inherits3.default)(DateTime, _React$Component);

  function DateTime(props) {
    (0, _classCallCheck3.default)(this, DateTime);

    var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this, props));

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
    this.refs.input.dispatch("blur");

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

    var dropDown = null;

    if (opened) {
      dropDown = _react2.default.createElement(_dropDown2.default, { store: this.store, key: current.format("YYYY-MM"), onDatePicked: this.datePicked, onTimeChanged: this.onTimeChanged, showTime: this.props.time });
    }

    return _react2.default.createElement(
      'div',
      { className: 'form-group caqui-datetime-holder' },
      label,
      _react2.default.createElement(
        'div',
        { className: 'caqui-datetime-holder', ref: 'holder' },
        _react2.default.createElement(_fakeTextInput2.default, {
          ref: 'input',
          value: displayer,
          placeholder: this.props.placeholder,
          onFocus: this.inputFocused,
          onBlur: this.inputBlured }),
        _react2.default.createElement(
          'div',
          { className: 'caqui-datetime-icon' },
          _react2.default.createElement(_icon2.default, { name: this.props.icon })
        ),
        dropDown
      )
    );
  };

  return DateTime;
}(_react2.default.Component);

DateTime.propTypes = {
  relatedForm: _react.PropTypes.string,
  displayFormat: _react.PropTypes.string,
  time: _react.PropTypes.bool
};
DateTime.defaultProps = {
  time: true,
  placeholder: "Pick a Date",
  icon: "calendar"
};
exports.default = (0, _helpers.modelize)(DateTime);