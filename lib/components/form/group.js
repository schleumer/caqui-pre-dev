'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _base = require('../base');

var _base2 = _interopRequireDefault(_base);

var _styles = require('../../styles');

var Styles = _interopRequireWildcard(_styles);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = Styles.form;

var Group = function (_Base) {
  (0, _inherits3.default)(Group, _Base);

  function Group(props) {
    (0, _classCallCheck3.default)(this, Group);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Base.call(this, props));

    _this.displayName = 'Form.Group';
    return _this;
  }

  Group.prototype.render = function render() {
    var children = this.props.children;

    return _react2.default.createElement(
      'div',
      (0, _extends3.default)({}, this.props, { className: (0, _classnames2.default)("caqui-form-group", this.props.className) }),
      children
    );
  };

  return Group;
}(_base2.default);

exports.default = Group;