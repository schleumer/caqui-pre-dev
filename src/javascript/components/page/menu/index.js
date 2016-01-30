import React from 'react';

import Base from '../../base';

class Menu extends Base {
  constructor(props) {
    super(props);
    this.displayName = 'Page.Menu';
  }

  render() {
    return (
      <div className="caqui-page-menu">
        { this.props.children }
      </div>
      );
  }
}

export default Menu;