"use strict";

exports.__esModule = true;

var _ramda = require("ramda");

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ColumnOffsets = function () {
  function ColumnOffsets() {
    var large = arguments.length <= 0 || arguments[0] === undefined ? 12 : arguments[0];
    var medium = arguments.length <= 1 || arguments[1] === undefined ? 12 : arguments[1];
    var small = arguments.length <= 2 || arguments[2] === undefined ? 12 : arguments[2];
    var extraSmall = arguments.length <= 3 || arguments[3] === undefined ? 12 : arguments[3];

    _classCallCheck(this, ColumnOffsets);

    this.offsets = {
      "large": large,
      "medium": medium,
      "small": small,
      "x-small": extraSmall
    };
  }

  ColumnOffsets.prototype.get = function get() {
    return this.offsets;
  };

  ColumnOffsets.prototype.large = function large() {
    var size = arguments.length <= 0 || arguments[0] === undefined ? 12 : arguments[0];

    return this.put("large", size);
  };

  ColumnOffsets.prototype.medium = function medium() {
    var size = arguments.length <= 0 || arguments[0] === undefined ? 12 : arguments[0];

    return this.put("medium", size);
  };

  ColumnOffsets.prototype.small = function small() {
    var size = arguments.length <= 0 || arguments[0] === undefined ? 12 : arguments[0];

    return this.put("small", size);
  };

  ColumnOffsets.prototype.extraSmall = function extraSmall() {
    var size = arguments.length <= 0 || arguments[0] === undefined ? 12 : arguments[0];

    return this.put("x-small", size);
  };

  ColumnOffsets.prototype.put = function put(deviceSize, size) {
    this.offsets[deviceSize] = size;
    return this;
  };

  return ColumnOffsets;
}();

exports.default = ColumnOffsets;