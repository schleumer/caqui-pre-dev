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

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _menu = require('./menu');

var _menu2 = _interopRequireDefault(_menu);

var _container = require('./container');

var _container2 = _interopRequireDefault(_container);

var _base = require('../base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Page = function (_Base) {
  (0, _inherits3.default)(Page, _Base);

  function Page(props) {
    (0, _classCallCheck3.default)(this, Page);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Base.call(this, props));

    _this.displayName = 'Page';
    return _this;
  }

  Page.prototype.render = function render() {
    var _props = this.props;
    var icon = _props.icon;
    var header = _props.header;
    var children = _props.children;


    var iconEl = null;
    var menu = null;
    var body = null;

    if (icon) {
      iconEl = _react2.default.createElement(_icon2.default, { className: 'caqui-page-header-icon', name: icon, style: { width: false, height: false, fill: 'white', marginRight: '10px' } });
    }

    if (Array.isArray(children)) {
      _react2.default.Children.forEach(children, function (child) {
        switch (child.type.name) {
          case 'Menu':
            menu = child;
            break;
          case 'Container':
            body = child;
            break;
          default:
            body = child;
        }
      });
    } else if (children) {
      body = children;
    }

    return _react2.default.createElement(
      'div',
      { className: 'row-fluid caqui-page-header' },
      _react2.default.createElement(
        'div',
        { className: 'row-fluid' },
        _react2.default.createElement(
          'h2',
          { className: 'caqui-page-header-title pull-left', style: { marginBottom: '0px', marginTop: '15px', marginLeft: '15px', marginRight: '15px' } },
          iconEl,
          _react2.default.createElement(
            'span',
            null,
            header
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'pull-right' },
          menu
        ),
        _react2.default.createElement('div', { style: { clear: 'both' } })
      ),
      _react2.default.createElement('hr', { style: { margin: '10px 0' } }),
      _react2.default.createElement(
        'div',
        { className: 'row-fluid' },
        _react2.default.createElement(
          'div',
          { className: 'col-xs-12' },
          body
        )
      )
    );
  };

  return Page;
}(_base2.default);

Page.Menu = _menu2.default;
Page.Container = _container2.default;

exports.default = Page;