import React from 'react';

import Base from './base';

class Text extends Base {
  constructor(props) {
    super(props);
    this.displayName = 'Text';
  }
  render() {
    return (
      <div>
        { this.props.children }
      </div>
      );
  }
}

export default Text;