'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _fakeTextInput = require('../fakeTextInput');

var _fakeTextInput2 = _interopRequireDefault(_fakeTextInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Shadow = function (_React$Component) {
  _inherits(Shadow, _React$Component);

  function Shadow(props) {
    _classCallCheck(this, Shadow);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.displayFocused = _this.displayFocused.bind(_this);
    return _this;
  }

  Shadow.prototype.displayFocused = function displayFocused(evt, a, b, c) {
    this.refs.displayer.tabIndex = -1;

    var store = this.props.store;

    store.dispatch(store.actions.open());
  };

  Shadow.prototype.unfocus = function unfocus() {
    this.refs.displayer.tabIndex = 0;
  };

  Shadow.prototype.focus = function focus() {
    this.refs.displayer.focus();
  };

  Shadow.prototype.render = function render() {
    var _props = this.props;
    var itemKey = _props.itemKey;
    var itemLabel = _props.itemLabel;
    var store = _props.store;
    var xd = _props.xd;

    var data = store.getState();

    var label = "Selecione uma opção";

    if (data.selected) {
      label = itemLabel(data.selected);
    }

    return _react2.default.createElement(
      _fakeTextInput2.default,
      {
        tabIndex: data.open ? '-1' : '0',
        onFocus: this.displayFocused,
        onClick: this.displayFocused,
        ref: 'displayer',
        className: 'caqui-combobox-shadow-holder' },
      _react2.default.createElement(
        'span',
        { className: 'caqui-combobox-shadow' },
        label
      ),
      _react2.default.createElement(
        'div',
        { className: 'caqui-combobox-shadow-icon' },
        _react2.default.createElement(_icon2.default, { name: 'search' })
      )
    );
  };

  return Shadow;
}(_react2.default.Component);

exports.default = Shadow;