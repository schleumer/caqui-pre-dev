import React from 'react';

import Menu from './menu';

import Base from '../../base';

class Container extends Base {
  constructor(props) {
    super(props);
    this.displayName = 'Page.Container';
  }

  render() {
    return (
      <div className="page__container">
        { this.props.children }
      </div>
      );
  }
}

Container.Menu = Menu;

export default Container;