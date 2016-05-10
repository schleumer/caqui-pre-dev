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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _textInput = require('../textInput');

var _textInput2 = _interopRequireDefault(_textInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Dropdown = function (_React$Component) {
    (0, _inherits3.default)(Dropdown, _React$Component);

    function Dropdown(props) {
        (0, _classCallCheck3.default)(this, Dropdown);

        var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this, props));

        _this.displayName = 'Dropdown';

        _this.onInput = _this.onInput.bind(_this);
        _this.onBlur = _this.onBlur.bind(_this);
        _this.onFocus = _this.onFocus.bind(_this);
        _this.onKeyDown = _this.onKeyDown.bind(_this);
        _this.inputDebounce = null;
        return _this;
    }

    Dropdown.prototype.onInput = function onInput(event, data) {
        var store = this.props.store;


        if (this.inputDebounce) {
            clearTimeout(this.inputDebounce);
        }

        this.inputDebounce = setTimeout(function () {
            store.dispatch(store.actions.filter(data));
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
        var _this2 = this;

        return function (evt) {
            var _props = _this2.props;
            var store = _props.store;
            var onChange = _props.onChange;

            onChange && onChange(item);

            evt.preventDefault();
        };
    };

    Dropdown.prototype.render = function render() {
        var _this3 = this;

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
                    { href: 'javascript:;', onClick: _this3.select(e), tabIndex: '-1', className: 'caqui-combobox-dropdown-list-item-anchor' },
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
                                name: 'combobox-dropdown-search',
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