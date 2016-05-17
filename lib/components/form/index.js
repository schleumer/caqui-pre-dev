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

var _alertBox = require('../alertBox');

var _alertBox2 = _interopRequireDefault(_alertBox);

var _component = require('./component');

var _component2 = _interopRequireDefault(_component);

var _group = require('./group');

var _group2 = _interopRequireDefault(_group);

var _footer = require('./footer');

var _footer2 = _interopRequireDefault(_footer);

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Form = function (_Component) {
    (0, _inherits3.default)(Form, _Component);

    function Form(props) {
        (0, _classCallCheck3.default)(this, Form);

        var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

        _this.displayName = 'Form';
        _this.created = new Date();

        _this.submit = _this.submit.bind(_this);
        _this.undo = _this.undo.bind(_this);
        return _this;
    }

    Form.prototype.submit = function submit(evt) {
        evt.preventDefault();

        var model = this.props.model;

        var value = null;

        if (model) {
            value = model.getValue();
        }

        this.props.onSubmit && this.props.onSubmit(value, e);
    };

    Form.prototype.undo = function undo() {
        var model = this.props.model;


        if (model) {
            model.undo();
        }
    };

    Form.prototype.render = function render() {
        var props = (0, _extends3.default)({}, this.props, {
            onSubmit: this.submit
        });

        return _react2.default.createElement(
            'form',
            props,
            _react2.default.createElement(_alertBox2.default, { namespace: props.name }),
            props.children
        );
    };

    return Form;
}(_component2.default);

Form.Group = _group2.default;
Form.Footer = _footer2.default;

exports.default = Form;