'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _textInput = require('../textInput');

var _textInput2 = _interopRequireDefault(_textInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
    var className = _props2.className;

    var data = store.getState();

    var popupMessage = null;

    var items = data.items.map(function (e, index) {
      var classNames = (0, _classnames2.default)("caqui-combobox-dropdown-list-item", {
        active: index == data.position,
        selected: data.selected && itemKey(data.selected) === itemKey(e)
      });

      return _react2.default.createElement(
        'li',
        { key: itemKey(e), className: classNames },
        _react2.default.createElement(
          'a',
          { href: 'javascript:;', onClick: _this4.select(e), tabIndex: '-1', className: 'caqui-combobox-dropdown-list-item-anchor' },
          itemLabel(e)
        )
      );
    });

    if (items.length < 1) {
      popupMessage = _react2.default.createElement(
        'li',
        { className: 'caqui-combobox-dropdown-list-text' },
        'Não há resultados'
      );
    }

    return _react2.default.createElement(
      'div',
      { className: (0, _classnames2.default)("caqui-combobox-dropdown-holder", className), ref: 'holder' },
      _react2.default.createElement(
        'div',
        { className: 'caqui-combobox-dropdown-backdrop' },
        _react2.default.createElement(
          'div',
          { className: 'caqui-combobox-dropdown' },
          _react2.default.createElement(
            'ul',
            { className: 'caqui-combobox-dropdown-list' },
            _react2.default.createElement(
              'li',
              { className: 'caqui-combobox-dropdown-list-search' },
              _react2.default.createElement(_textInput2.default, {
                className: 'caqui-combobox-dropdown-search-input',
                ref: 'search',
                defaultValue: data.filter,
                onChange: this.onInput,
                onBlur: this.onBlur,
                onFocus: this.onFocus,
                onKeyDown: this.onKeyDown })
            ),
            items,
            popupMessage,
            _react2.default.createElement('li', { role: 'separator', className: 'caqui-combobox-dropdown-list-separator' }),
            _react2.default.createElement(
              'li',
              { className: 'caqui-combobox-dropdown-list-text' },
              data.status
            )
          )
        )
      )
    );
  };

  return Dropdown;
}(_react2.default.Component);

exports.default = Dropdown;