'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _helpers = require('../helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ModelDump = function (_React$Component) {
  _inherits(ModelDump, _React$Component);

  function ModelDump(props) {
    _classCallCheck(this, ModelDump);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.displayName = 'ModelDump';
    _this.state = {
      value: null
    };
    return _this;
  }

  ModelDump.prototype.setValue = function setValue(value) {
    this.setState({
      value: value
    });
  };

  ModelDump.prototype.getValue = function getValue() {
    return null;
  };

  ModelDump.prototype.render = function render() {
    return _react2.default.createElement(
      'pre',
      null,
      JSON.stringify(this.state.value, null, 2)
    );
  };

  return ModelDump;
}(_react2.default.Component);

ModelDump.propTypes = {
  form: _react.PropTypes.string
};
exports.default = (0, _helpers.modelize)(ModelDump);