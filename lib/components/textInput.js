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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _form = require('./form');

var _form2 = _interopRequireDefault(_form);

var _icon = require('./icon');

var _icon2 = _interopRequireDefault(_icon);

var _alertBox = require('./alertBox');

var _alertBox2 = _interopRequireDefault(_alertBox);

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _helpers = require('../helpers');

var _system = require('../system');

var system = _interopRequireWildcard(_system);

var _styles = require('../styles');

var Styles = _interopRequireWildcard(_styles);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = Styles.textInput;
var m = system.m;

/// XXX: ?????????????
var objectId = 1;

var TextInput = function (_Base) {
    (0, _inherits3.default)(TextInput, _Base);

    function TextInput(props) {
        (0, _classCallCheck3.default)(this, TextInput);

        // just for control

        var _this = (0, _possibleConstructorReturn3.default)(this, _Base.call(this, props));

        _this.objectId = objectId++;

        _this.displayName = 'TextInput';
        _this.state = {
            value: null
        };

        _this.onChange = _this.onChange.bind(_this);

        _this.inputDebounce = null;
        return _this;
    }

    TextInput.prototype.onChange = function onChange(evt) {
        var newValue = evt.target.value || null;

        this.setValue(newValue);

        if (this.inputDebounce) {
            clearTimeout(this.inputDebounce);
        }

        if (this.props.onChange) {
            this.props.onChange((0, _helpers.createEvent)(evt, this, newValue));
        }
    };

    TextInput.prototype.getValue = function getValue() {
        return this.state.value;
    };

    TextInput.prototype.getImmediateValue = function getImmediateValue() {
        return this.refs.input.value || null;
    };

    TextInput.prototype.setValue = function setValue(value) {
        this.setState({
            value: value,
            focused: false
        });
    };

    TextInput.prototype.makeId = function makeId(props) {
        var _context = this.context;
        var caquiRelatedForm = _context.caquiRelatedForm;
        var caquiModel = _context.caquiModel;


        var nextId = [caquiRelatedForm, caquiModel].filter(function (x) {
            return !!x;
        });

        if (nextId.length) {
            this.id = nextId.join('.');
        } else {
            this.id = null;
        }
    };

    TextInput.prototype.componentWillReceiveProps = function componentWillReceiveProps(props) {
        this.makeId(props);
    };

    TextInput.prototype.componentWillMount = function componentWillMount() {
        this.state.value = this.props.value || null;
        this.makeId(this.props);
    };

    TextInput.prototype.focus = function focus() {
        var input = this.refs.input;


        input.focus();

        input.selectionStart = input.selectionEnd = input.value.length;
    };

    TextInput.prototype.render = function render() {
        var props = (0, _extends3.default)({}, this.props);
        var label = props.label;
        var placeholder = props.placeholder;
        var className = props.className;
        var hint = props.hint;

        // @todo helper

        var classNames = (0, _classnames2.default)('caqui-form-control', className);

        var alertBox = null;
        var hintBox = null;

        if (this.id) {
            alertBox = _react2.default.createElement(_alertBox2.default, { silence: true, namespace: this.id });
        }

        if (hint) {
            hintBox = _react2.default.createElement(
                'div',
                { className: 'caqui-form-control-hint' },
                _react2.default.createElement(_icon2.default, { name: 'help', className: 'hint-icon' }),
                _react2.default.createElement(
                    'div',
                    { className: 'hint' },
                    hint
                )
            );
        }

        if (!props.hasOwnProperty("defaultValue")) {
            props.value = this.state.value || "";
        }

        return _react2.default.createElement(
            _form2.default.Group,
            null,
            label && _react2.default.createElement(
                'label',
                { style: styles.label },
                label
            ),
            _react2.default.createElement(
                'div',
                { className: 'caqui-form-control-holder' },
                _react2.default.createElement('input', (0, _extends3.default)({}, props, {
                    type: props.type || "text",
                    className: classNames,
                    placeholder: placeholder || label,
                    onChange: this.onChange,
                    ref: 'input' })),
                hintBox
            ),
            _react2.default.createElement(
                'div',
                { className: 'caqui-form-control-footer' },
                alertBox
            )
        );
    };

    return TextInput;
}(_base2.default);

TextInput.propTypes = {
    label: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.element]),
    hint: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.element]),
    placeholder: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.element])
};
TextInput.defaultProps = {
    label: null,
    placeholder: null
};
TextInput.contextTypes = {
    caquiRelatedForm: _react2.default.PropTypes.string,
    caquiModel: _react2.default.PropTypes.any
};
exports.default = (0, _helpers.modelize)(TextInput);