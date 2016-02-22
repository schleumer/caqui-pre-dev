import React from 'react';

import Base from '../../../base';

class Right extends Base {
  constructor(props) {
    super(props);
    this.displayName = 'Right';
  }
  render() {
    return (
      <div className="caqui-page-right pull-right">
        { this.props.children }
      </div>
      );
  }
}

export default Right;
