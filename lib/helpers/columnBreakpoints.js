"use strict";

exports.__esModule = true;

var _ramda = require("ramda");

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ColumnBreakpoints = function () {
  function ColumnBreakpoints() {
    var large = arguments.length <= 0 || arguments[0] === undefined ? 12 : arguments[0];
    var medium = arguments.length <= 1 || arguments[1] === undefined ? 12 : arguments[1];
    var small = arguments.length <= 2 || arguments[2] === undefined ? 12 : arguments[2];
    var extraSmall = arguments.length <= 3 || arguments[3] === undefined ? 12 : arguments[3];

    _classCallCheck(this, ColumnBreakpoints);

    this.breakPoints = {
      "large": large,
      "medium": medium,
      "small": small,
      "x-small": extraSmall
    };
  }

  ColumnBreakpoints.prototype.get = function get() {
    return this.breakPoints;
  };

  ColumnBreakpoints.prototype.large = function large() {
    var size = arguments.length <= 0 || arguments[0] === undefined ? 12 : arguments[0];

    return this.put("large", size);
  };

  ColumnBreakpoints.prototype.medium = function medium() {
    var size = arguments.length <= 0 || arguments[0] === undefined ? 12 : arguments[0];

    return this.put("medium", size);
  };

  ColumnBreakpoints.prototype.small = function small() {
    var size = arguments.length <= 0 || arguments[0] === undefined ? 12 : arguments[0];

    return this.put("small", size);
  };

  ColumnBreakpoints.prototype.extraSmall = function extraSmall() {
    var size = arguments.length <= 0 || arguments[0] === undefined ? 12 : arguments[0];

    return this.put("x-small", size);
  };

  ColumnBreakpoints.prototype.put = function put(deviceSize, size) {
    this.breakPoints[deviceSize] = size;
    return this;
  };

  return ColumnBreakpoints;
}();

exports.default = ColumnBreakpoints;