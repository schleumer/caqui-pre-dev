'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _helpers = require('../helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ValuedTabs = function (_Base) {
  _inherits(ValuedTabs, _Base);

  function ValuedTabs(props) {
    _classCallCheck(this, ValuedTabs);

    var _this = _possibleConstructorReturn(this, _Base.call(this, props));

    _this.displayName = 'ValuedTabs';
    _this.state = {
      activeTab: null
    };

    _this.selectTab = _this.selectTab.bind(_this);
    return _this;
  }

  ValuedTabs.prototype.selectTab = function selectTab(tab) {
    var _this2 = this;

    return function (evt) {
      _this2.setValue(tab);

      if (_this2.props.onChange) {
        _this2.props.onChange((0, _helpers.createEvent)(evt, _this2, tab));
      }
    };
  };

  ValuedTabs.prototype.childrenNotPresent = function childrenNotPresent() {
    return !this.props.children || !Array.isArray(this.props.children) || !this.props.children > 0;
  };

  ValuedTabs.prototype.getFirstChild = function getFirstChild() {
    if (!this.childrenNotPresent()) {
      return this.props.children[0].props.id;
    }

    return null;
  };

  ValuedTabs.prototype.componentWillMount = function componentWillMount() {
    this.setState({
      activeTab: this.getFirstChild()
    });
  };

  ValuedTabs.prototype.componentWillReceiveProps = function componentWillReceiveProps() {
    this.forceUpdate();
  };

  ValuedTabs.prototype.getValue = function getValue() {
    return this.state.activeTab;
  };

  ValuedTabs.prototype.setValue = function setValue(value) {
    this.setState({
      activeTab: value || this.getFirstChild()
    });
  };

  ValuedTabs.prototype.render = function render() {
    var tabs = [];
    //<li role="presentation" className="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">Home</a></li>
    if (this.childrenNotPresent()) {
      return _react2.default.createElement(
        'b',
        null,
        'Não há items'
      );
    }

    var active = null;

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

      if (item.props.id == this.state.activeTab) {
        className += "active";
        active = item;
      }

      tabs.push(_react2.default.createElement(
        'li',
        { role: 'presentation', key: item.props.id, onClick: this.selectTab(item.props.id), className: className },
        _react2.default.createElement(
          'a',
          { href: 'javascript:;', 'aria-controls': 'home', role: 'tab', 'data-toggle': 'tab', key: item.props.header },
          item.props.header
        )
      ));
    }

    if (!active) {
      active = this.props.children[0];
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

  return ValuedTabs;
}(_base2.default);

ValuedTabs.propTypes = {
  form: _react.PropTypes.string
};
exports.default = (0, _helpers.modelize)(ValuedTabs);