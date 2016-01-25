'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styles = require('../../styles');

var Styles = _interopRequireWildcard(_styles);

var _textInput = require('../textInput');

var _textInput2 = _interopRequireDefault(_textInput);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = Styles.comboBox;

var Dropdown = function (_React$Component) {
  _inherits(Dropdown, _React$Component);

  function Dropdown(props) {
    _classCallCheck(this, Dropdown);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.displayName = 'Dropdown';

    _this.onInput = _this.onInput.bind(_this);
    _this.onBlur = _this.onBlur.bind(_this);
    _this.onFocus = _this.onFocus.bind(_this);
    _this.onKeyDown = _this.onKeyDown.bind(_this);
    _this.inputDebounce = null;
    return _this;
  }

  Dropdown.prototype.onInput = function onInput() {
    var _this2 = this;

    var store = this.props.store;

    if (this.inputDebounce) {
      clearTimeout(this.inputDebounce);
    }

    this.inputDebounce = setTimeout(function () {
      store.dispatch(store.actions.filter(_this2.refs.search.getValue()));
    }, 300);
  };

  Dropdown.prototype.onBlur = function onBlur(evt, id, originalEvent) {
    this.props.onBlur && this.props.onBlur(evt, id, originalEvent);
  };

  Dropdown.prototype.onFocus = function onFocus() {};

  Dropdown.prototype.onKeyDown = function onKeyDown(evt) {
    var store = this.props.store;

    var state = store.getState();

    switch (evt.which) {
      case 38:
        // UP
        store.dispatch(store.actions.up());
        evt.preventDefault();
        break;
      case 40:
        // DOWN
        store.dispatch(store.actions.down());
        evt.preventDefault();
        break;
      case 13:
        // ENTER
        var current = state.items[state.position];

        if (current) {
          this.select(current)(evt);
        } else {
          store.dispatch(store.actions.close());
        }

        break;
      case 27:
        // ESC
        store.dispatch(store.actions.close());
        evt.preventDefault();
        break;
      default:
    }
  };

  Dropdown.prototype.componentDidMount = function componentDidMount() {
    var search = this.refs.search;

    search.dispatch("focus");
    //search.selectionStart = search.selectionEnd = search.value.length;
  };

  Dropdown.prototype.select = function select(item) {
    var _this3 = this;

    return function (evt) {
      var _props = _this3.props;
      var store = _props.store;
      var onChange = _props.onChange;

      onChange && onChange(item);

      evt.preventDefault();
    };
  };

  Dropdown.prototype.render = function render() {
    var _this4 = this;

    var _props2 = this.props;
    var itemKey = _props2.itemKey;
    var itemLabel = _props2.itemLabel;
    var store = _props2.store;

    var data = store.getState();

    var popupMessage = null;

    var items = data.items.map(function (e, index) {
      var style = styles.dropDown.listItem;
      var anchorStyle = styles.dropDown.listItemAnchor;

      if (index == data.position) {
        style = _extends({}, style, styles.dropDown.listItemActive);
        anchorStyle = _extends({}, anchorStyle, styles.dropDown.listItemAnchorActive);
      }
      if (data.selected) {
        if (itemKey(data.selected) === itemKey(e)) {
          style = _extends({}, style, styles.dropDown.listItemSelected);
          anchorStyle = _extends({}, anchorStyle, styles.dropDown.listItemAnchorSelected);
        }
      }
      return _react2.default.createElement(
        'li',
        { key: itemKey(e), style: style },
        _react2.default.createElement(
          'a',
          { href: 'javascript:;', onClick: _this4.select(e), tabIndex: '-1', style: anchorStyle },
          itemLabel(e)
        )
      );
    });

    if (items.length < 1) {
      popupMessage = _react2.default.createElement(
        'li',
        { style: styles.dropDown.text },
        'Não há resultados'
      );
    }

    return _react2.default.createElement(
      'div',
      { style: styles.dropDown.holder, ref: 'holder' },
      _react2.default.createElement(
        'div',
        { style: styles.dropDown.menu },
        _react2.default.createElement(
          'ul',
          { style: styles.dropDown.list },
          _react2.default.createElement(
            'li',
            { style: styles.dropDown.listSearch },
            _react2.default.createElement(_textInput2.default, {
              style: styles.dropDown.listSearchInput,
              ref: 'search',
              defaultValue: data.filter,
              onChange: this.onInput,
              onBlur: this.onBlur,
              onFocus: this.onFocus,
              onKeyDown: this.onKeyDown })
          ),
          items,
          popupMessage,
          _react2.default.createElement('li', { role: 'separator', style: styles.dropDown.divider }),
          _react2.default.createElement(
            'li',
            { style: _extends({}, styles.dropDown.text, styles.dropDown.footerText) },
            data.status
          )
        )
      )
    );
  };

  return Dropdown;
}(_react2.default.Component);

exports.default = Dropdown;