'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FixedDataTableWrapper = function (_React$Component) {
  _inherits(FixedDataTableWrapper, _React$Component);

  function FixedDataTableWrapper(props) {
    _classCallCheck(this, FixedDataTableWrapper);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.displayName = "FixedDataTableWrapper";

    _this.state = {
      width: 0
    };
    return _this;
  }

  FixedDataTableWrapper.prototype.componentDidMount = function componentDidMount() {
    this.setState({
      width: this.refs.wrapper.offsetWidth
    });
  };

  FixedDataTableWrapper.prototype.render = function render() {
    if (!this.state.width) {
      return _react2.default.createElement('div', { style: { overflow: 'hidden', width: '100%', position: 'relative' }, ref: 'wrapper' });
    }

    var child = _react2.default.cloneElement(this.props.children, {
      width: this.state.width
    });

    return _react2.default.createElement(
      'div',
      { style: { overflow: 'hidden', width: '100%', position: 'relative' }, ref: 'wrapper' },
      child
    );
  };

  return FixedDataTableWrapper;
}(_react2.default.Component);

exports.default = FixedDataTableWrapper;