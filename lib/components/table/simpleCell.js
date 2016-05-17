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

var _base = require('../base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SimpleCell = function (_Base) {
    (0, _inherits3.default)(SimpleCell, _Base);

    function SimpleCell(props) {
        (0, _classCallCheck3.default)(this, SimpleCell);

        var _this = (0, _possibleConstructorReturn3.default)(this, _Base.call(this, props));

        _this.displayName = 'Table.SimpleCell';
        return _this;
    }

    SimpleCell.prototype.render = function render() {
        return _react2.default.createElement(
            'div',
            null,
            this.props.row[this.props.valueKey]
        );
    };

    return SimpleCell;
}(_base2.default);

exports.default = SimpleCell;