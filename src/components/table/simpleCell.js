import React from 'react';

import Base from '../base';

class SimpleCell extends Base {
  constructor(props) {
    super(props);
    this.displayName = 'Table.SimpleCell';
  }
  render() {
    return <div>
             { this.props.row[this.props.valueKey] }
           </div>;
  }
}

export default SimpleCell;
