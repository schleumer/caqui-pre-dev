'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tabs = function (_Base) {
  _inherits(Tabs, _Base);

  function Tabs(props) {
    _classCallCheck(this, Tabs);

    var _this = _possibleConstructorReturn(this, _Base.call(this, props));

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

    for (var _iterator = this.props.children, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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

      var className = "";
      if (item.props.id == active.props.id) {
        className += "active";
      }
      tabs.push(_react2.default.createElement(
        'li',
        { role: 'presentation', key: item.props.id, onClick: this.selectTab(item), className: className },
        _react2.default.createElement(
          'a',
          { href: 'javascript:;', 'aria-controls': 'home', role: 'tab', 'data-toggle': 'tab', key: item.props.header },
          item.props.header
        )
      ));
    }

    return _react2.default.createElement(
      'div',
      { style: { marginBottom: '20px' } },
      _react2.default.createElement(
        'ul',
        { className: 'nav nav-tabs', role: 'tablist' },
        tabs
      ),
      _react2.default.createElement(
        'div',
        { className: 'tab-content' },
        _react2.default.createElement(
          'div',
          { role: 'tabpanel', className: 'tab-pane active' },
          active
        )
      )
    );
  };

  return Tabs;
}(_base2.default);

exports.default = Tabs;