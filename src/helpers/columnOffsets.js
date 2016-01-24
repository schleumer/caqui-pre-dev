import R from 'ramda';

class ColumnOffsets {
  constructor(large = 12, medium = 12, small = 12, extraSmall = 12) {
    this.offsets = {
      "large": large,
      "medium": medium,
      "small": small,
      "x-small": extraSmall
    };
  }

  get() {
    return this.offsets;
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
    this.offsets[deviceSize] = size;
    return this;
  }
}

export default ColumnOffsets;