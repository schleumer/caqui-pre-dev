"use strict";

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

exports.__esModule = true;

var _ramda = require("ramda");

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var classTemplate = "col-$1-offset-$2";
var devicesSizes = {
  "x-small": "xs",
  "small": "sm",
  "medium": "md",
  "large": "lg"
};

var sizesObjToString = _ramda2.default.pipe(_ramda2.default.toPairs, _ramda2.default.map(function (s) {
  return classTemplate.replace('$1', devicesSizes.hasOwnProperty(s[0]) ? devicesSizes[s[0]] : s[0]).replace('$2', s[1]);
}));

var ColumnOffsets = function () {
  function ColumnOffsets() {
    var large = arguments.length <= 0 || arguments[0] === undefined ? 12 : arguments[0];
    var medium = arguments.length <= 1 || arguments[1] === undefined ? 12 : arguments[1];
    var small = arguments.length <= 2 || arguments[2] === undefined ? 12 : arguments[2];
    var extraSmall = arguments.length <= 3 || arguments[3] === undefined ? 12 : arguments[3];
    (0, _classCallCheck3.default)(this, ColumnOffsets);

    this.offsets = {
      "large": large,
      "medium": medium,
      "small": small,
      "x-small": extraSmall
    };
  }

  ColumnOffsets.prototype.toArray = function toArray() {
    return sizesObjToString(this.offsets);
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