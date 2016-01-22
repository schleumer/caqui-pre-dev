import React from 'react';

import Base from './base';

class Container extends Base {
  constructor(props) {
    super(props);
    this.displayName = 'Container';
  }
  render() {
    // @todo coding style
    const className = [this.props.fluid ? "container-fluid" : "container"];

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

export default Container;
