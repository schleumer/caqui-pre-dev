'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var select = function select(state) {
  return {
    loading: state.loading
  };
};

var Loading = function (_Base) {
  _inherits(Loading, _Base);

  function Loading(props) {
    _classCallCheck(this, Loading);

    var _this = _possibleConstructorReturn(this, _Base.call(this, props));

    _this.displayName = 'Loading';
    return _this;
  }

  Loading.prototype.render = function render() {
    var loading = this.props.loading;

    if (!loading.state) return null;

    return _react2.default.createElement(
      'div',
      { className: 'app-loading' },
      _react2.default.createElement(
        'div',
        { className: 'app-loading__holder' },
        _react2.default.createElement(
          'div',
          { className: 'logo-loading' },
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