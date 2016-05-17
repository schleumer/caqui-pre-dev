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

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _cage = require('../cage');

var _cage2 = _interopRequireDefault(_cage);

var _fakeTextInput = require('../fakeTextInput');

var _fakeTextInput2 = _interopRequireDefault(_fakeTextInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Shadow = function (_React$Component) {
    (0, _inherits3.default)(Shadow, _React$Component);

    function Shadow(props) {
        (0, _classCallCheck3.default)(this, Shadow);

        var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this, props));

        _this.displayFocused = _this.displayFocused.bind(_this);
        _this.trash = _this.trash.bind(_this);
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
        this.refs.displayer.dispatch('focus');
    };

    Shadow.prototype.trash = function trash() {
        if (this.props.onTrash) {
            this.props.onTrash();
        }
    };

    Shadow.prototype.render = function render() {
        var _props = this.props;
        var itemKey = _props.itemKey;
        var itemLabel = _props.itemLabel;
        var store = _props.store;


        var data = store.getState();

        var label = "Selecione uma opção";
        var value = null;

        if (data.selected) {
            value = itemLabel(data.selected);
        }

        var icon = null;

        if (data.selected) {
            icon = _react2.default.createElement(
                'div',
                { className: 'caqui-combobox-trash-icon', onClick: this.trash },
                _react2.default.createElement(_icon2.default, { name: 'trash' })
            );
        } else {
            icon = _react2.default.createElement(
                'div',
                { className: 'caqui-combobox-shadow-icon' },
                _react2.default.createElement(_icon2.default, { name: 'magnify' })
            );
        }

        //<span className="caqui-combobox-shadow">{ label }</span>
        return _react2.default.createElement(
            'div',
            { style: { position: 'relative' } },
            _react2.default.createElement(
                _cage2.default,
                null,
                _react2.default.createElement(_fakeTextInput2.default, {
                    tabIndex: data.open ? '-1' : '0',
                    onFocus: this.displayFocused,
                    onClick: this.displayFocused,
                    ref: 'displayer',
                    className: 'caqui-combobox-shadow-holder',
                    value: value,
                    placeholder: label })
            ),
            icon
        );
    };

    return Shadow;
}(_react2.default.Component);

exports.default = Shadow;