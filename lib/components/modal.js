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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * TODO: PropTypes
 */

var Body = function (_React$Component) {
  (0, _inherits3.default)(Body, _React$Component);

  function Body() {
    (0, _classCallCheck3.default)(this, Body);
    return (0, _possibleConstructorReturn3.default)(this, _React$Component.apply(this, arguments));
  }

  Body.prototype.render = function render() {
    return _react2.default.createElement(
      'div',
      null,
      this.props.children
    );
  };

  return Body;
}(_react2.default.Component);

var Footer = function (_React$Component2) {
  (0, _inherits3.default)(Footer, _React$Component2);

  function Footer(props) {
    (0, _classCallCheck3.default)(this, Footer);

    var _this2 = (0, _possibleConstructorReturn3.default)(this, _React$Component2.call(this, props));

    _this2.secondaryClicked = _this2.secondaryClicked.bind(_this2);
    _this2.primaryClicked = _this2.primaryClicked.bind(_this2);
    return _this2;
  }

  Footer.prototype.primaryClicked = function primaryClicked() {
    if (this.props.onPrimaryClick) {
      this.props.onPrimaryClick();
    }
  };

  Footer.prototype.secondaryClicked = function secondaryClicked() {
    if (this.props.onSecondaryClick) {
      this.props.onSecondaryClick();
    }
  };

  Footer.prototype.render = function render() {
    var secondaryButton = null;

    if (this.props.withSecondary) {
      secondaryButton = _react2.default.createElement(
        'button',
        {
          type: 'button',
          className: 'btn btn-default',
          'data-dismiss': 'modal',
          onClick: this.secondaryClicked },
        this.props.secondaryText
      );
    }

    if (this.props.children) {
      return _react2.default.createElement(
        'div',
        null,
        secondaryButton,
        this.props.children
      );
    }

    return _react2.default.createElement(
      'div',
      { className: 'modal-footer' },
      secondaryButton,
      _react2.default.createElement(
        'button',
        {
          type: 'button',
          className: 'btn btn-primary',
          onClick: this.primaryClicked },
        this.props.primaryText
      )
    );
  };

  return Footer;
}(_react2.default.Component);

/**
 * TODO: PropTypes
 */


var Header = function (_React$Component3) {
  (0, _inherits3.default)(Header, _React$Component3);

  function Header(props) {
    (0, _classCallCheck3.default)(this, Header);

    var _this3 = (0, _possibleConstructorReturn3.default)(this, _React$Component3.call(this, props));

    _this3.onClose = _this3.onClose.bind(_this3);
    return _this3;
  }

  Header.prototype.onClose = function onClose() {
    if (this.props.onClose) {
      this.props.onClose();
    }
  };

  Header.prototype.render = function render() {
    if (this.props.children) {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'button',
          {
            type: 'button',
            className: 'close',
            'data-dismiss': 'modal',
            'aria-label': 'Close',
            onClick: this.onClose },
          _react2.default.createElement(
            'span',
            { 'aria-hidden': 'true' },
            '×'
          )
        ),
        this.props.children
      );
    }

    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'button',
        {
          type: 'button',
          className: 'close',
          'data-dismiss': 'modal',
          'aria-label': 'Close' },
        _react2.default.createElement(
          'span',
          { 'aria-hidden': 'true' },
          '×'
        )
      ),
      _react2.default.createElement(
        'h4',
        { className: 'modal-title' },
        'Modal title'
      )
    );
  };

  return Header;
}(_react2.default.Component);

/**
 * TODO: PropTypes
 */


var Modal = function (_React$Component4) {
  (0, _inherits3.default)(Modal, _React$Component4);

  function Modal(props) {
    (0, _classCallCheck3.default)(this, Modal);

    var _this4 = (0, _possibleConstructorReturn3.default)(this, _React$Component4.call(this, props));

    _this4.displayName = 'Modal';

    _this4.onClose = _this4.onClose.bind(_this4);
    _this4.onClickOut = _this4.onClickOut.bind(_this4);
    _this4.primaryClicked = _this4.primaryClicked.bind(_this4);
    _this4.secondaryClicked = _this4.secondaryClicked.bind(_this4);
    return _this4;
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
      this.props.onClose();
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

    return _react2.default.createElement(
      Header,
      { onClose: this.onClose },
      children
    );
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
      Body,
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

    return _react2.default.createElement(Footer, {
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
            tabindex: '-1',
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

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;
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