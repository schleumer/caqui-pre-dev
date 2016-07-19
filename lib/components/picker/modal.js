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

var _modal = require('../modal');

var _modal2 = _interopRequireDefault(_modal);

var _checkBox = require('../checkBox');

var _checkBox2 = _interopRequireDefault(_checkBox);

var _cage = require('../cage');

var _cage2 = _interopRequireDefault(_cage);

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
    } else {
      this.props.adapter.uncheck(this.props.item);
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

/**
 * TODO: PropTypes
 */


var Modal = function (_React$Component2) {
  (0, _inherits3.default)(Modal, _React$Component2);

  function Modal(props) {
    (0, _classCallCheck3.default)(this, Modal);

    var _this2 = (0, _possibleConstructorReturn3.default)(this, _React$Component2.call(this, props));

    _this2.displayName = 'Picker(Modal)';
    return _this2;
  }

  Modal.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.isVisible) {
      this.props.adapter.touch();
    }
  };

  Modal.prototype.render = function render() {
    var _this3 = this;

    var items = this.props.items.map(function (item) {
      return _react2.default.createElement(Item, {
        key: _this3.props.itemKey(item.value),
        adapter: _this3.props.adapter,
        item: item,
        itemLabel: _this3.props.itemLabel,
        checkedItems: _this3.props.checkedItems,
        indexedItems: _this3.props.indexedItems });
    });

    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        _modal2.default,
        { isVisible: this.props.isVisible, onClose: this.props.onClose },
        items
      )
    );
  };

  return Modal;
}(_react2.default.Component);

Modal.propTypes = {
  isVisible: _react.PropTypes.bool,
  onClose: _react.PropTypes.func.isRequired,
  itemLabel: _react.PropTypes.func.isRequired
};
exports.default = Modal;