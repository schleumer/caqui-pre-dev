'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _columnBreakpoints = require('../helpers/columnBreakpoints');

var _columnBreakpoints2 = _interopRequireDefault(_columnBreakpoints);

var _columnOffsets = require('../helpers/columnOffsets');

var _columnOffsets2 = _interopRequireDefault(_columnOffsets);

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Column = function (_Base) {
  (0, _inherits3.default)(Column, _Base);

  function Column(props) {
    (0, _classCallCheck3.default)(this, Column);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Base.call(this, props));

    _this.displayName = 'Column';
    return _this;
  }

  Column.prototype.render = function render() {
    // @todo better coding style

    var offsets = this.props.offset;

    var sizes = this.props.size;
    var classes = [];

    if (!sizes) {
      sizes = Column.from();
    }

    if (sizes && sizes instanceof _columnBreakpoints2.default) {
      classes = classes.concat(sizes.toArray());
    }

    if (offsets && offsets instanceof _columnOffsets2.default) {
      classes = classes.concat(offsets.toArray());
    }

    return _react2.default.createElement(
      'div',
      (0, _extends3.default)({}, this.props, { className: classes.join(' '), style: (0, _extends3.default)({}, this.props.style) }),
      this.props.children
    );
  };

  return Column;
}(_base2.default);

Column.large = function (size) {
  return new _columnBreakpoints2.default().large(size);
};
Column.medium = function (size) {
  return new _columnBreakpoints2.default().medium(size);
};
Column.small = function (size) {
  return new _columnBreakpoints2.default().small(size);
};
Column.extraSmall = function (size) {
  return new _columnBreakpoints2.default().extraSmall(size);
};
Column.from = function () {
  var large = arguments.length <= 0 || arguments[0] === undefined ? 12 : arguments[0];
  var medium = arguments.length <= 1 || arguments[1] === undefined ? 12 : arguments[1];
  var small = arguments.length <= 2 || arguments[2] === undefined ? 12 : arguments[2];
  var extraSmall = arguments.length <= 3 || arguments[3] === undefined ? 12 : arguments[3];
  return new _columnBreakpoints2.default(large, medium, small, extraSmall);
};
Column.offset = function () {
  var large = arguments.length <= 0 || arguments[0] === undefined ? 12 : arguments[0];
  var medium = arguments.length <= 1 || arguments[1] === undefined ? 12 : arguments[1];
  var small = arguments.length <= 2 || arguments[2] === undefined ? 12 : arguments[2];
  var extraSmall = arguments.length <= 3 || arguments[3] === undefined ? 12 : arguments[3];
  return new _columnOffsets2.default(large, medium, small, extraSmall);
};

exports.default = Column;