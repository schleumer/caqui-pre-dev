import React from 'react';

import Base from './base';

class Row extends Base {
  constructor(props) {
    super(props);
    this.displayName = 'Row';
  }

  render() {
    // @todo coding style
    const className = [this.props.fluid ? "row-fluid" : "row"];

    if (this.props.className) {
      className.push(this.props.className);
    }

    return (
      <div {...this.props} className={ className.join(' ') } style={ {  ...this.props.style} }>
        { this.props.children }
      </div>
      );
  }
}

export default Row;
