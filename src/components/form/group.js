import React from 'react';

import Base from '../base';

class Group extends Base {
  constructor(props) {
    super(props);
    this.displayName = 'Form.Group';
  }

  render() {
    const children = this.props.children;

    return (
      <div className="form-group">
        { children }
      </div>
      );
  }
}

export default Group;
