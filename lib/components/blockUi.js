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

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * TODO: PropTypes
 */
var BlockUI = function (_Base) {
  (0, _inherits3.default)(BlockUI, _Base);

  function BlockUI(props) {
    (0, _classCallCheck3.default)(this, BlockUI);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Base.call(this, props));

    _this.displayName = 'BlockUI';
    return _this;
  }

  BlockUI.prototype.render = function render() {
    var _props = this.props;
    var state = _props.state;
    var message = _props.message;
    var subMessage = _props.subMessage;


    if (state) {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'caqui-blocked-ui' },
          this.props.children
        ),
        _react2.default.createElement(
          'div',
          { className: 'caqui-block-ui' },
          _react2.default.createElement(
            'div',
            { className: 'caqui-block-ui-holder' },
            _react2.default.createElement(
              'div',
              { className: 'caqui-spinner' },
              _react2.default.createElement('div', { className: 'caqui-bounce1' }),
              _react2.default.createElement('div', { className: 'caqui-bounce2' }),
              _react2.default.createElement('div', { className: 'caqui-bounce3' })
            ),
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                'b',
                null,
                message
              )
            ),
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                'b',
                null,
                subMessage
              )
            )
          )
        )
      );
    }

    return this.props.children;
  };

  return BlockUI;
}(_base2.default);

exports.default = BlockUI;