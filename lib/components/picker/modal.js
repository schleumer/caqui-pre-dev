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

var _modal = require('../modal');

var _modal2 = _interopRequireDefault(_modal);

var _checkBox = require('../checkBox');

var _checkBox2 = _interopRequireDefault(_checkBox);

var _cage = require('../cage');

var _cage2 = _interopRequireDefault(_cage);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Item = function (_React$Component) {
  (0, _inherits3.default)(Item, _React$Component);

  function Item(props) {
    (0, _classCallCheck3.default)(this, Item);

    var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this, props));

    _this.onChange = _this.onChange.bind(_this);
    return _this;
  }

  Item.prototype.onChange = function onChange(event) {
    if (event.target.checked) {
      this.props.adapter.check(this.props.item);
      this.props.onChecked(this.props.item);
    } else {
      this.props.adapter.uncheck(this.props.item);
      this.props.onUnchecked(this.props.item);
    }
  };

  Item.prototype.render = function render() {
    var _props = this.props;
    var item = _props.item;
    var indexedItems = _props.indexedItems;
    var itemLabel = _props.itemLabel;


    var id = 'checkbox-' + this.oid + '-' + item.key;

    return _react2.default.createElement(
      _cage2.default,
      null,
      _react2.default.createElement(
        _checkBox2.default,
        {
          id: id,
          type: 'checkbox',
          className: 'caqui-checkbox',
          onChange: this.onChange,
          checked: indexedItems.indexOf(item.key) > -1 },
        itemLabel(item.value)
      )
    );
  };

  return Item;
}(_react2.default.Component);

Item.propTypes = {
  isVisible: _react.PropTypes.bool,
  onUnchecked: _react.PropTypes.func.isRequired,
  onChecked: _react.PropTypes.func.isRequired
};

var PaginationButton = function (_React$Component2) {
  (0, _inherits3.default)(PaginationButton, _React$Component2);

  function PaginationButton(props) {
    (0, _classCallCheck3.default)(this, PaginationButton);

    var _this2 = (0, _possibleConstructorReturn3.default)(this, _React$Component2.call(this, props));

    _this2.displayName = 'Table.PaginationButton';

    _this2.onClick = _this2.onClick.bind(_this2);
    return _this2;
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
    var _props2 = this.props;
    var active = _props2.active;
    var disabled = _props2.disabled;
    var children = _props2.children;


    var liClasses = [];

    if (disabled && !active) {
      liClasses.push('disabled');
    }

    if (active) {
      liClasses.push('active');
    }

    return _react2.default.createElement(
      'li',
      {
        onClick: this.onClick,
        className: liClasses.join(' ') },
      _react2.default.createElement(
        'a',
        { href: 'javascript:' },
        children
      )
    );
  };

  return PaginationButton;
}(_react2.default.Component);

PaginationButton.contextTypes = {
  router: _react2.default.PropTypes.any
};

var Modal = function (_React$Component3) {
  (0, _inherits3.default)(Modal, _React$Component3);

  function Modal(props) {
    (0, _classCallCheck3.default)(this, Modal);

    var _this3 = (0, _possibleConstructorReturn3.default)(this, _React$Component3.call(this, props));

    _this3.displayName = 'Picker(Modal)';

    _this3.onItemChecked = _this3.onItemChecked.bind(_this3);
    _this3.onItemUnchecked = _this3.onItemUnchecked.bind(_this3);

    _this3.hasFirst = _this3.hasFirst.bind(_this3);
    _this3.hasPrev = _this3.hasPrev.bind(_this3);
    _this3.hasNext = _this3.hasNext.bind(_this3);
    _this3.hasLast = _this3.hasLast.bind(_this3);
    _this3.firstPage = _this3.firstPage.bind(_this3);
    _this3.prevPage = _this3.prevPage.bind(_this3);
    _this3.nextPage = _this3.nextPage.bind(_this3);
    _this3.lastPage = _this3.lastPage.bind(_this3);
    _this3.goToPage = _this3.goToPage.bind(_this3);
    return _this3;
  }

  Modal.prototype.onItemChecked = function onItemChecked() {
    this.props.onChange();
  };

  Modal.prototype.onItemUnchecked = function onItemUnchecked() {
    this.props.onChange();
  };

  Modal.prototype.adapterWillChange = function adapterWillChange(promise) {
    var _this4 = this;

    if (promise.then) {
      promise.then(function () {
        var state = _this4.props.adapter.getState();

        _this4.props.queryUpdated && _this4.props.queryUpdated((0, _extends3.default)({
          limit: state.itemsPerPage,
          page: state.page
        }, state.filter ? {
          query: state.filter
        } : {}));
      });
    }
  };

  Modal.prototype.hasFirst = function hasFirst() {
    return this.props.adapter.hasFirst();
  };

  Modal.prototype.hasPrev = function hasPrev() {
    return this.props.adapter.hasPrev();
  };

  Modal.prototype.hasNext = function hasNext() {
    return this.props.adapter.hasNext();
  };

  Modal.prototype.hasLast = function hasLast() {
    return this.props.adapter.hasLast();
  };

  Modal.prototype.firstPage = function firstPage() {
    this.adapterWillChange(this.props.adapter.firstPage());
  };

  Modal.prototype.prevPage = function prevPage() {
    this.adapterWillChange(this.props.adapter.prevPage());
  };

  Modal.prototype.nextPage = function nextPage() {
    this.adapterWillChange(this.props.adapter.nextPage());
  };

  Modal.prototype.lastPage = function lastPage() {
    this.adapterWillChange(this.props.adapter.lastPage());
  };

  Modal.prototype.goToPage = function goToPage(page) {
    var _this5 = this;

    return function () {
      _this5.adapterWillChange(_this5.props.adapter.goToPage(page));
    };
  };

  Modal.prototype.render = function render() {
    var _this6 = this;

    var _props$adapter$getSta = this.props.adapter.getState();

    var loading = _props$adapter$getSta.loading;
    var totalOfPages = _props$adapter$getSta.totalOfPages;
    var page = _props$adapter$getSta.page;


    var items = this.props.items.map(function (item) {
      return _react2.default.createElement(Item, {
        key: _this6.props.itemKey(item.value),
        adapter: _this6.props.adapter,
        item: item,
        itemLabel: _this6.props.itemLabel,
        checkedItems: _this6.props.checkedItems,
        indexedItems: _this6.props.indexedItems,
        onChecked: _this6.onItemChecked,
        onUnchecked: _this6.onItemUnchecked });
    });

    var pageButtons = (0, _immutable.Range)(1, totalOfPages + 1).filter(function (item) {
      return item <= 3 && page < 3 || item <= page + 1 && item >= page - 1 || item > totalOfPages - 3;
    }).map(function (item) {
      return _react2.default.createElement(
        PaginationButton,
        {
          active: item == page,
          disabled: item == page,
          key: 'page.' + item,
          onClick: _this6.goToPage(item) },
        item
      );
    }).toJS();

    if (pageButtons.length == 6) {
      pageButtons = [].concat(pageButtons.slice(0, 3), [_react2.default.createElement(
        PaginationButton,
        {
          disabled: true,
          key: '...' },
        '...'
      )], pageButtons.slice(3, 6));
    }

    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        _modal2.default,
        { isVisible: this.props.isVisible, onClose: this.props.onClose },
        _react2.default.createElement(
          'div',
          null,
          items
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'div',
            { style: { textAlign: 'center', 'marginBottom': '20px' } },
            _react2.default.createElement(
              'ul',
              { className: 'pagination' },
              _react2.default.createElement(
                PaginationButton,
                {
                  disabled: !this.hasFirst(),
                  onClick: this.firstPage },
                _react2.default.createElement(_icon2.default, { name: 'rewind' })
              ),
              _react2.default.createElement(
                PaginationButton,
                {
                  disabled: !this.hasPrev(),
                  onClick: this.prevPage },
                _react2.default.createElement(_icon2.default, { name: 'backward' })
              ),
              pageButtons,
              _react2.default.createElement(
                PaginationButton,
                {
                  disabled: !this.hasNext(),
                  onClick: this.nextPage },
                _react2.default.createElement(_icon2.default, { name: 'forward' })
              ),
              _react2.default.createElement(
                PaginationButton,
                {
                  disabled: !this.hasLast(),
                  onClick: this.lastPage },
                _react2.default.createElement(_icon2.default, { name: 'fast-forward' })
              )
            )
          )
        )
      )
    );
  };

  return Modal;
}(_react2.default.Component);

Modal.propTypes = {
  isVisible: _react.PropTypes.bool,
  onClose: _react.PropTypes.func.isRequired,
  itemLabel: _react.PropTypes.func.isRequired,
  onChange: _react.PropTypes.func.isRequired
};
exports.default = Modal;