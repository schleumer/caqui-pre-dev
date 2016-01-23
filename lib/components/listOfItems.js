'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _helpers = require('../helpers');

var _row = require('./row');

var _row2 = _interopRequireDefault(_row);

var _column = require('./column');

var _column2 = _interopRequireDefault(_column);

var _button = require('./button');

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ListOfItems = function (_React$Component) {
  _inherits(ListOfItems, _React$Component);

  function ListOfItems(props) {
    _classCallCheck(this, ListOfItems);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.displayName = 'ListOfItems';
    _this.onAdd = _this.onAdd.bind(_this);

    _this.state = {
      items: []
    };

    _this.removeItem = _this.removeItem.bind(_this);
    return _this;
  }

  ListOfItems.prototype.setValue = function setValue(value) {
    this.setState({
      items: value || []
    });

    return value;
  };

  ListOfItems.prototype.getValue = function getValue() {
    return null;
  };

  ListOfItems.prototype.onAdd = function onAdd() {
    var newItem = this.props.before(this.refs.input.getValue());

    var _props = this.props;
    var uniqueBy = _props.uniqueBy;
    var itemKey = _props.itemKey;

    uniqueBy = uniqueBy || itemKey;

    var check = this.state.items.filter(function (item) {
      return uniqueBy(item) === uniqueBy(newItem);
    }).length > 0;

    if (check) {
      return;
    }

    var items = [].concat(this.state.items, [newItem]);
    this.setState({
      items: items
    });

    this.props.onChange && this.props.onChange((0, _helpers.createEvent)(null, this, items));

    this.refs.input.setValue(null);
  };

  ListOfItems.prototype.removeItem = function removeItem(item) {
    var _this2 = this;

    return function (evt) {
      var oldItems = _this2.state.items;
      var index = oldItems.indexOf(item);

      var items = [].concat(oldItems.filter(function (x) {
        return x != item;
      }));

      _this2.setState({
        items: items
      });
      _this2.props.onChange && _this2.props.onChange((0, _helpers.createEvent)(null, _this2, items));

      return false;
    };
  };

  ListOfItems.prototype.render = function render() {
    var _this3 = this;

    console.log("ListOfItems rendered");

    var _props2 = this.props;
    var input = _props2.input;
    var itemLabel = _props2.itemLabel;
    var itemKey = _props2.itemKey;
    var children = _props2.children;

    var child = children || input;

    if (Array.isArray(child)) {
      throw new Error("ListOfItems children must be a single element");
    }

    var items = [];
    var info = null;

    if (this.state.items) {
      items = this.state.items.map(function (item) {
        return _react2.default.createElement(
          'tr',
          { key: itemKey(item) },
          _react2.default.createElement(
            'td',
            { style: { width: '100%' } },
            itemLabel(item)
          ),
          _react2.default.createElement(
            'td',
            null,
            _react2.default.createElement(
              'a',
              { href: 'javascript:;', onClick: _this3.removeItem(item) },
              'remover'
            )
          )
        );
      });
    }

    if (!items.length) {
      items = _react2.default.createElement(
        'tr',
        null,
        _react2.default.createElement(
          'td',
          null,
          'Lista vázia'
        )
      );
    }

    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        _row2.default,
        null,
        _react2.default.createElement(
          _column2.default,
          { size: _column2.default.from(8) },
          _react2.default.cloneElement(child, {
            ref: 'input'
          })
        ),
        _react2.default.createElement(
          _column2.default,
          { size: _column2.default.from(4) },
          _react2.default.createElement(
            _button2.default,
            { onClick: this.onAdd },
            'Adicionar'
          )
        )
      ),
      _react2.default.createElement(
        _row2.default,
        null,
        _react2.default.createElement(
          _column2.default,
          { size: _column2.default.from(12) },
          _react2.default.createElement(
            'table',
            { className: 'table table-bordered' },
            _react2.default.createElement(
              'tbody',
              null,
              items,
              info
            )
          )
        )
      )
    );
  };

  return ListOfItems;
}(_react2.default.Component);

ListOfItems.propTypes = {
  form: _react.PropTypes.string,
  uniqueBy: _react.PropTypes.func,
  before: _react.PropTypes.func
};
ListOfItems.defaultProps = {
  itemLabel: function itemLabel(_) {
    return _;
  },
  itemKey: function itemKey(_) {
    return btoa(JSON.stringify(_));
  },
  before: function before(_) {
    return _;
  }
};
ListOfItems.__ignoreChildren = true;
exports.default = (0, _helpers.modelize)(ListOfItems);