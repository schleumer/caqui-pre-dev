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

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _header = require('./header');

var _header2 = _interopRequireDefault(_header);

var _body = require('./body');

var _body2 = _interopRequireDefault(_body);

var _footer = require('./footer');

var _footer2 = _interopRequireDefault(_footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Modal = function (_React$Component) {
  (0, _inherits3.default)(Modal, _React$Component);

  function Modal(props) {
    (0, _classCallCheck3.default)(this, Modal);

    var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this, props));

    _this.displayName = 'Modal';

    _this.onClose = _this.onClose.bind(_this);
    _this.onClickOut = _this.onClickOut.bind(_this);
    _this.primaryClicked = _this.primaryClicked.bind(_this);
    _this.secondaryClicked = _this.secondaryClicked.bind(_this);
    return _this;
  }

  Modal.prototype.onClickOut = function onClickOut(evt) {
    if (this.refs.holder === evt.target) {
      this.onClose(evt);
    }
  };

  Modal.prototype.onClose = function onClose() {
    if (this.props.onClose) {
      this.props.onClose();
    }
  };

  Modal.prototype.primaryClicked = function primaryClicked() {
    if (this.props.onPrimaryClick) {
      this.props.onPrimaryClick();
    }
  };

  Modal.prototype.secondaryClicked = function secondaryClicked() {
    if (this.props.onSecondaryClick) {
      this.props.onSecondaryClick();
    } else {
      this.onClose();
    }
  };

  Modal.prototype.getHeader = function getHeader(children) {
    if (Array.isArray(children)) {
      var el = children.filter(function (comp) {
        return comp.type.name == 'Header';
      }).shift();
      if (el) {
        return _react2.default.cloneElement(el, {
          onClose: this.onClose
        });
      }
    }

    return _react2.default.createElement(_header2.default, { onClose: this.onClose, title: this.props.title });
  };

  Modal.prototype.getBody = function getBody(children) {
    if (Array.isArray(children)) {
      var el = children.filter(function (comp) {
        return comp.type.name == 'Body';
      }).shift();
      if (el) {
        return el;
      }
    }

    return _react2.default.createElement(
      _body2.default,
      null,
      children
    );
  };

  Modal.prototype.getFooter = function getFooter(children) {
    if (Array.isArray(children)) {
      var el = children.filter(function (comp) {
        return comp.type.name == 'Footer';
      }).shift();
      if (el) {
        console.log(el.props);
        return el;
      }
    }

    return _react2.default.createElement(_footer2.default, {
      secondaryText: this.props.secondaryText,
      primaryText: this.props.primaryText,
      withSecondary: this.props.withSecondary,
      onSecondaryClick: this.secondaryClicked,
      onPrimaryClick: this.primaryClicked });
  };

  Modal.prototype.render = function render() {
    var style = {
      overflow: 'auto'
    };

    var modal = null;

    if (this.props.isVisible) {
      var children = this.props.children;

      var header = this.getHeader(this.props.title || children);
      var body = this.getBody(children);
      var footer = this.getFooter(children);
      modal = _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement('div', { className: 'modal-backdrop fade in' }),
        _react2.default.createElement(
          'div',
          {
            ref: 'holder',
            className: 'modal show',
            tabIndex: '-1',
            role: 'dialog',
            onClick: this.onClickOut,
            style: style },
          _react2.default.createElement(
            'div',
            { className: 'modal-dialog' },
            _react2.default.createElement(
              'div',
              { className: 'modal-content' },
              _react2.default.createElement(
                'div',
                { className: 'modal-header' },
                header
              ),
              _react2.default.createElement(
                'div',
                { className: 'modal-body' },
                body
              ),
              footer
            )
          )
        )
      );
    }

    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        _reactAddonsCssTransitionGroup2.default,
        {
          transitionName: 'caqui-modal-anim',
          transitionEnterTimeout: 350,
          transitionLeaveTimeout: 350 },
        modal
      )
    );
  };

  return Modal;
}(_react2.default.Component);

Modal.Header = _header2.default;
Modal.Body = _body2.default;
Modal.Footer = _footer2.default;
Modal.propTypes = {
  secondaryText: _react.PropTypes.node,
  primaryText: _react.PropTypes.node,
  onPrimaryClick: _react.PropTypes.func,
  onSecondaryClick: _react.PropTypes.func,
  withSecondary: _react.PropTypes.bool,
  isVisible: _react.PropTypes.bool,
  title: _react.PropTypes.node
};
Modal.defaultProps = {
  secondaryText: 'Close',
  primaryText: 'Ok',
  onPrimaryClick: null,
  onSecondaryClick: null,
  withSecondary: true,
  isVisible: false,
  title: null
};
exports.default = Modal;