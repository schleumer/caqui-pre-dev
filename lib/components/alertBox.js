'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reselect = require('reselect');

var _actions = require('../actions');

var actions = _interopRequireWildcard(_actions);

var _icon = require('./icon');

var _icon2 = _interopRequireDefault(_icon);

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var select = (0, _reselect.createSelector)(function (state, props) {
  return {
    errors: state.errors.filter(function (_) {
      return _.field.indexOf(props.namespace) > -1;
    }),
    messages: state.messages.filter(function (_) {
      return _.field.indexOf(props.namespace) > -1;
    })
  };
}, function (_) {
  return _;
});

var ErrorBox = function (_Base) {
  _inherits(ErrorBox, _Base);

  function ErrorBox() {
    _classCallCheck(this, ErrorBox);

    return _possibleConstructorReturn(this, _Base.apply(this, arguments));
  }

  ErrorBox.prototype.render = function render() {
    if (this.props.silence) {
      return _react2.default.createElement(
        'div',
        { className: 'text-danger', onClick: this.props.onClick },
        _react2.default.createElement(_icon2.default, { name: 'alert-circle', style: { marginRight: '5px' } }),
        _react2.default.createElement(
          'span',
          null,
          this.props.item.message
        )
      );
    } else {
      return _react2.default.createElement(
        'div',
        { className: 'alert alert-danger', onClick: this.props.onClick },
        _react2.default.createElement(_icon2.default, { name: 'alert-circle', style: { marginRight: '5px' } }),
        _react2.default.createElement(
          'span',
          null,
          this.props.item.message
        )
      );
    }
  };

  return ErrorBox;
}(_base2.default);

var MessageBox = function (_Base2) {
  _inherits(MessageBox, _Base2);

  function MessageBox() {
    _classCallCheck(this, MessageBox);

    return _possibleConstructorReturn(this, _Base2.apply(this, arguments));
  }

  MessageBox.prototype.render = function render() {
    if (this.props.silence) {
      return _react2.default.createElement(
        'div',
        { className: 'text-info', onClick: this.props.onClick },
        _react2.default.createElement(_icon2.default, { name: 'info', style: { marginRight: '5px' } }),
        _react2.default.createElement(
          'span',
          null,
          this.props.item.message
        )
      );
    } else {
      return _react2.default.createElement(
        'div',
        { className: 'alert alert-info', onClick: this.props.onClick },
        _react2.default.createElement(_icon2.default, { name: 'info', style: { marginRight: '5px' } }),
        _react2.default.createElement(
          'span',
          null,
          this.props.item.message
        )
      );
    }
  };

  return MessageBox;
}(_base2.default);

var AlertBox = function (_Base3) {
  _inherits(AlertBox, _Base3);

  function AlertBox(props) {
    _classCallCheck(this, AlertBox);

    var _this3 = _possibleConstructorReturn(this, _Base3.call(this, props));

    _this3.displayName = 'AlertBox';
    _this3.forgetError = _this3.forgetError.bind(_this3);
    _this3.forgetMessage = _this3.forgetMessage.bind(_this3);
    return _this3;
  }

  AlertBox.prototype.componentWillMount = function componentWillMount() {
    this.setState({
      namespace: this.props.namespace
    });
  };

  AlertBox.prototype.forgetError = function forgetError(item) {
    var _this4 = this;

    return function () {
      _this4.props.dispatch(actions.forgetError(item));
    };
  };

  AlertBox.prototype.forgetMessage = function forgetMessage(item) {
    var _this5 = this;

    return function () {
      _this5.props.dispatch(actions.forgetMessage(item));
    };
  };

  AlertBox.prototype.render = function render() {
    var _this6 = this;

    var _props = this.props;
    var errors = _props.errors;
    var messages = _props.messages;

    var messagesBoxes = messages.map(function (_) {
      return _react2.default.createElement(MessageBox, { silence: _this6.props.silence, key: _.id, item: _, onClick: _this6.forgetMessage(_) });
    });
    var errorsBoxes = errors.map(function (_) {
      return _react2.default.createElement(ErrorBox, { silence: _this6.props.silence, key: _.id, item: _, onClick: _this6.forgetError(_) });
    });

    return _react2.default.createElement(
      'div',
      { className: 'alert-box' },
      _react2.default.createElement(
        'div',
        { className: 'alert-box__messages-boxes' },
        messagesBoxes
      ),
      _react2.default.createElement(
        'div',
        { className: 'alert-box__errors-boxes' },
        errorsBoxes
      )
    );
  };

  return AlertBox;
}(_base2.default);

AlertBox = (0, _reactRedux.connect)(select)(AlertBox);

AlertBox.propTypes = {
  namespace: _react.PropTypes.string,
  silence: _react.PropTypes.bool
};

AlertBox.defaultProps = {
  namespace: 'general',
  silence: false
};

exports.default = AlertBox;