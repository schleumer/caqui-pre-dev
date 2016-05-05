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

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

var _textInput = require('../textInput');

var _textInput2 = _interopRequireDefault(_textInput);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Search = function (_React$Component) {
    (0, _inherits3.default)(Search, _React$Component);

    function Search(props) {
        (0, _classCallCheck3.default)(this, Search);

        var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this, props));

        _this.displayName = 'Search';

        _this.doTheFilter = _this.doTheFilter.bind(_this);
        return _this;
    }

    Search.prototype.doTheFilter = function doTheFilter(e) {
        this.props.adapter.filter(this.refs.search.getValue());
        e.preventDefault();
    };

    Search.prototype.render = function render() {
        var adapter = this.props.adapter;

        var state = adapter.store.getState();

        var filter = state.filter;


        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(_textInput2.default, { placeholder: 'Buscar...', ref: 'search', value: filter }),
            _react2.default.createElement(
                'div',
                { style: { position: 'absolute', right: '15px', top: '0px' } },
                _react2.default.createElement(
                    'button',
                    { className: 'btn btn-link', type: 'button', onClick: this.doTheFilter },
                    _react2.default.createElement(_icon2.default, { name: 'magnify', style: { width: '20px', 'height': '20px' } })
                )
            )
        );
    };

    return Search;
}(_react2.default.Component);

exports.default = Search;