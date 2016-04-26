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

var _reactRedux = require('react-redux');

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var select = function select(state) {
  return {
    loading: state.loading
  };
};

var Loading = function (_Base) {
  (0, _inherits3.default)(Loading, _Base);

  function Loading(props) {
    (0, _classCallCheck3.default)(this, Loading);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Base.call(this, props));

    _this.displayName = 'Loading';
    return _this;
  }

  Loading.prototype.render = function render() {
    var loading = this.props.loading;


    if (!loading.state) return null;

    return _react2.default.createElement(
      'div',
      { className: 'caqui-loading' },
      _react2.default.createElement(
        'div',
        { className: 'caqui-loading-holder' },
        _react2.default.createElement(
          'div',
          { className: 'caqui-logo-loading' },
          _react2.default.createElement('div', { className: 'circle-1' }),
          _react2.default.createElement('div', { className: 'circle-2' })
        ),
        _react2.default.createElement(
          'div',
          null,
          'Carregando...'
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'b',
            null,
            loading.message
          )
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'b',
            null,
            loading.subMessage
          )
        )
      )
    );
  };

  return Loading;
}(_base2.default);

exports.default = (0, _reactRedux.connect)(select)(Loading);