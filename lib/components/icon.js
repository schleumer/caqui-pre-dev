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

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Icon = function (_Base) {
    (0, _inherits3.default)(Icon, _Base);

    function Icon(props) {
        (0, _classCallCheck3.default)(this, Icon);

        var _this = (0, _possibleConstructorReturn3.default)(this, _Base.call(this, props));

        _this.displayName = 'Icon';
        return _this;
    }

    Icon.prototype.render = function render() {
        var style = (0, _extends3.default)({}, this.props.style);

        var classNames = (0, _classnames2.default)("caqui-icon", this.props.className);

        var name = this.props.name;

        // special icon ;)
        if (name == 'backward') {
            name = 'forward';
            style.transform = 'rotate(180deg)';
        } else if (name == 'sign-out') {
            name = 'sign-in';
            style.transform = 'rotate(180deg)';
        }

        return _react2.default.createElement(
            'svg',
            { className: classNames, style: style },
            _react2.default.createElement('use', { xlinkHref: "#" + name })
        );
    };

    return Icon;
}(_base2.default);

exports.default = Icon;