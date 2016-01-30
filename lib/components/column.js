'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _columnBreakpoints = require('../helpers/columnBreakpoints');

var _columnBreakpoints2 = _interopRequireDefault(_columnBreakpoints);

var _columnOffsets = require('../helpers/columnOffsets');

var _columnOffsets2 = _interopRequireDefault(_columnOffsets);

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Column = function (_Base) {
  _inherits(Column, _Base);

  function Column(props) {
    _classCallCheck(this, Column);

    var _this = _possibleConstructorReturn(this, _Base.call(this, props));

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
      _extends({}, this.props, { className: classes.join(' '), style: _extends({}, this.props.style) }),
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