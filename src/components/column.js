import React from 'react';
import ColumnBreakpoints from '../helpers/columnBreakpoints';
import ColumnOffsets from '../helpers/columnOffsets';

import * as Styles from '../styles';
const styles = Styles.root;

import Base from './base';

const breakPointPriotity = {
  "x-small": 1,
  "small": 2,
  "medium": 3,
  "large": 4
}

class Column extends Base {
  constructor(props) {
    super(props);
    this.displayName = 'Column';
  }
  render() {
    let currentBreakPoint = "large";
    let size = this.props.size;
    let offsets = null;
    let style = {...styles.column, ...this.props.style}

    if (size && (size instanceof ColumnBreakpoints)) {
      size = size.get();
    } else {
      size = Column.from().get();
    }

    if (offsets && (offsets instanceof ColumnOffsets)) {
      offsets = offsets.get();
    }

    if (offsets) {
      style = {...style, marginLeft: (100 / (12 / offsets[currentBreakPoint])) + "%"}
    }

    style = {...style, width: (100 / (12 / size[currentBreakPoint])) + "%"}

    return (
      <div {...this.props} style={ style }>
        { this.props.children }
      </div>
      );
  }
}


Column.large = size => new ColumnBreakpoints().large(size);
Column.medium = size => new ColumnBreakpoints().medium(size);
Column.small = size => new ColumnBreakpoints().small(size);
Column.extraSmall = size => new ColumnBreakpoints().extraSmall(size);
Column.from = (large = 12, medium = 12, small = 12, extraSmall = 12) => new ColumnBreakpoints(large, medium, small, extraSmall);
Column.offset = (large = 12, medium = 12, small = 12, extraSmall = 12) => new ColumnOffsets(large, medium, small, extraSmall);

export default Column;
