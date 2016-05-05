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

var _column = require('./column');

var _column2 = _interopRequireDefault(_column);

var _simpleCell = require('./simpleCell');

var _simpleCell2 = _interopRequireDefault(_simpleCell);

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

var _textInput = require('../textInput');

var _textInput2 = _interopRequireDefault(_textInput);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _immutable = require('immutable');

var _base = require('../base');

var _base2 = _interopRequireDefault(_base);

var _search = require('./search');

var _search2 = _interopRequireDefault(_search);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PaginationButton = function (_Base) {
    (0, _inherits3.default)(PaginationButton, _Base);

    function PaginationButton(props) {
        (0, _classCallCheck3.default)(this, PaginationButton);

        var _this = (0, _possibleConstructorReturn3.default)(this, _Base.call(this, props));

        _this.displayName = 'Table.PaginationButton';

        _this.onClick = _this.onClick.bind(_this);
        return _this;
    }

    PaginationButton.prototype.onClick = function onClick(e) {
        if (!this.props.disabled) {
            if (this.props.onClick) {
                this.props.onClick();
            }
        }
        e.preventDefault();
    };

    PaginationButton.prototype.render = function render() {
        var _props = this.props;
        var active = _props.active;
        var disabled = _props.disabled;
        var children = _props.children;


        var liClasses = [];

        if (disabled && !active) {
            liClasses.push('disabled');
        }

        if (active) {
            liClasses.push('active');
        }

        return _react2.default.createElement(
            'li',
            { onClick: this.onClick, className: liClasses.join(' ') },
            _react2.default.createElement(
                'a',
                { href: 'javascript:;' },
                children
            )
        );
    };

    return PaginationButton;
}(_base2.default);

var Table = function (_Base2) {
    (0, _inherits3.default)(Table, _Base2);

    function Table(props) {
        (0, _classCallCheck3.default)(this, Table);

        var _this2 = (0, _possibleConstructorReturn3.default)(this, _Base2.call(this, props));

        _this2.displayName = 'Table';

        // sorry, world
        _this2.unsafeUnmounted = false;
        return _this2;
    }

    Table.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        var _this3 = this;

        if (this.props.adapter != nextProps.adapter) {
            nextProps.adapter.subscribe(function () {
                if (_this3.unsafeUnmounted) {
                    return;
                }
                _this3.setState(nextProps.adapter.getState());
            });
            this.setState(nextProps.adapter.getState());
        }
    };

    Table.prototype.componentWillUnmount = function componentWillUnmount() {
        this.unsafeUnmounted = true;
    };

    Table.prototype.componentWillMount = function componentWillMount() {
        var _this4 = this;

        var adapter = this.props.adapter;


        adapter.subscribe(function () {
            if (_this4.unsafeUnmounted) {
                return;
            }
            _this4.setState(adapter.getState());
        });

        this.setState(adapter.getState());
    };

    Table.prototype.render = function render() {
        var adapter = this.props.adapter;
        var _state = this.state;
        var loading = _state.loading;
        var items = _state.items;
        var totalOfPages = _state.totalOfPages;
        var page = _state.page;
        var filter = _state.filter;


        if (loading) {
            return _react2.default.createElement(
                'div',
                { style: { width: '200px', margin: '0 auto', textAlign: 'center', marginTop: '50px' } },
                _react2.default.createElement(
                    'div',
                    { className: 'logo-loading', style: { marginBottom: '10px' } },
                    _react2.default.createElement('div', { className: 'circle-1' }),
                    _react2.default.createElement('div', { className: 'circle-2' })
                ),
                _react2.default.createElement(
                    'b',
                    null,
                    'Carregando dados...'
                )
            );
        }

        var columns = _react2.default.Children.map(this.props.children, function (el) {
            return el.props;
        });

        var header = columns.map(function (props) {
            return _react2.default.createElement(
                'th',
                { key: props.name },
                props.name
            );
        });

        var rows = items.map(function (item, index) {
            var rowColumns = columns.map(function (column) {
                var el = null;
                if (_react2.default.isValidElement(column.cell)) {
                    el = _react2.default.cloneElement(column.cell, {
                        row: item
                    });
                } else {
                    el = column.cell(item, index);
                }

                return _react2.default.createElement(
                    'td',
                    { key: column.name },
                    el,
                    ' '
                );
            });
            return _react2.default.createElement(
                'tr',
                { key: item.id },
                rowColumns
            );
        });

        var pageButtons = (0, _immutable.Range)(1, totalOfPages + 1).filter(function (item) {
            return item <= 3 && page < 3 || item <= page + 1 && item >= page - 1 || item > totalOfPages - 3;
        }).map(function (item) {
            return _react2.default.createElement(
                PaginationButton,
                { active: item == page, disabled: item == page, key: "page." + item,
                    onClick: adapter.goToPage(item) },
                item
            );
        }).toJS();

        if (pageButtons.length == 6) {
            pageButtons = [].concat(pageButtons.slice(0, 3), [_react2.default.createElement(
                PaginationButton,
                { disabled: true, key: '...' },
                '...'
            )], pageButtons.slice(3, 6));
        }

        var search = null;

        if (this.props.withSearch) {
            search = _react2.default.createElement(
                'div',
                { className: 'row', style: { marginBottom: '10px' } },
                _react2.default.createElement(
                    'div',
                    { className: 'col-xs-4 pull-right' },
                    _react2.default.createElement(_search2.default, { adapter: this.props.adapter })
                )
            );
        }

        // onSubmit={ this.doTheFilter }

        return _react2.default.createElement(
            'div',
            null,
            search,
            _react2.default.createElement(
                'table',
                { className: 'table table-bordered table-striped' },
                _react2.default.createElement(
                    'thead',
                    null,
                    _react2.default.createElement(
                        'tr',
                        null,
                        header
                    )
                ),
                _react2.default.createElement(
                    'tbody',
                    null,
                    rows
                )
            ),
            _react2.default.createElement(
                'div',
                { style: { textAlign: 'center', 'marginBottom': '20px' } },
                _react2.default.createElement(
                    'ul',
                    { className: 'pagination' },
                    _react2.default.createElement(
                        PaginationButton,
                        { disabled: !adapter.hasFirst(), onClick: adapter.firstPage },
                        _react2.default.createElement(_icon2.default, { name: 'rewind' })
                    ),
                    _react2.default.createElement(
                        PaginationButton,
                        { disabled: !adapter.hasPrev(), onClick: adapter.prevPage },
                        _react2.default.createElement(_icon2.default, { name: 'backward' })
                    ),
                    pageButtons,
                    _react2.default.createElement(
                        PaginationButton,
                        { disabled: !adapter.hasNext(), onClick: adapter.nextPage },
                        _react2.default.createElement(_icon2.default, { name: 'forward' })
                    ),
                    _react2.default.createElement(
                        PaginationButton,
                        { disabled: !adapter.hasLast(), onClick: adapter.lastPage },
                        _react2.default.createElement(_icon2.default, { name: 'fast-forward' })
                    )
                )
            )
        );
    };

    return Table;
}(_base2.default);

Table.defaultProps = {
    withSearch: true
};


Table.SimpleCell = _simpleCell2.default;
Table.Column = _column2.default;
Table.Search = _search2.default;

exports.default = Table;