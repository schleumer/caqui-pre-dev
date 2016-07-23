'use strict';

exports.__esModule = true;

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * TODO: PropTypes
 */
var Tabs = function (_Base) {
  (0, _inherits3.default)(Tabs, _Base);

  function Tabs(props) {
    (0, _classCallCheck3.default)(this, Tabs);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Base.call(this, props));

    _this.displayName = 'Tabs';
    _this.activeTab = null;

    _this.selectTab = _this.selectTab.bind(_this);
    return _this;
  }

  Tabs.prototype.selectTab = function selectTab(tab) {
    var _this2 = this;

    return function () {
      _this2.activeTab = tab;
      _this2.forceUpdate();
    };
  };

  Tabs.prototype.componentWillReceiveProps = function componentWillReceiveProps() {
    this.forceUpdate();
  };

  Tabs.prototype.render = function render() {
    var tabs = [];
    //<li role="presentation" className="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">Home</a></li>

    var active = this.activeTab || this.props.children[0];

    for (var _iterator = this.props.children, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var item = _ref;

      var className = '';
      if (item.props.id == active.props.id) {
        className += 'active';
      }
      tabs.push(_react2.default.createElement(
        'li',
        {
          role: 'presentation',
          key: item.props.id,
          onClick: this.selectTab(item),
          className: className },
        _react2.default.createElement(
          'a',
          {
            href: 'javascript:',
            'aria-controls': 'home',
            role: 'tab',
            'data-toggle': 'tab',
            key: item.props.header },
          item.props.header
        )
      ));
    }

    return _react2.default.createElement(
      'div',
      { style: { marginBottom: '20px' } },
      _react2.default.createElement(
        'ul',
        {
          className: 'nav nav-tabs',
          role: 'tablist' },
        tabs
      ),
      _react2.default.createElement(
        'div',
        { className: 'tab-content' },
        _react2.default.createElement(
          'div',
          {
            role: 'tabpanel',
            className: 'tab-pane active' },
          active
        )
      )
    );
  };

  return Tabs;
}(_base2.default);

exports.default = Tabs;