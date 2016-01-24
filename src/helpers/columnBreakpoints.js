import R from 'ramda';

class ColumnBreakpoints {
  constructor(large = 12, medium = 12, small = 12, extraSmall = 12) {
    this.breakPoints = {
      "large": large,
      "medium": medium,
      "small": small,
      "x-small": extraSmall
    };
  }

  get() {
    return this.breakPoints;
  }

  large(size = 12) {
    return this.put("large", size);
  }

  medium(size = 12) {
    return this.put("medium", size);
  }

  small(size = 12) {
    return this.put("small", size);
  }

  extraSmall(size = 12) {
    return this.put("x-small", size);
  }

  put(deviceSize, size) {
    this.breakPoints[deviceSize] = size;
    return this;
  }
}

export default ColumnBreakpoints;