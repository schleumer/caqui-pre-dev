import React from 'react';
import cx from 'classnames';

import Base from './base';

class Container extends Base {
  constructor(props) {
    super(props);
    this.displayName = 'Container';
  }
  render() {
    // @todo coding style

    //if (this.props.className) {
    //  className.push(this.props.className);
    //}

    return (
      <div {...this.props} className={cx(this.props.className, {
        "caqui-container": !this.props.fluid,
        "caqui-container-fluid": this.props.fluid
      })}>
        { this.props.children }
      </div>
      );
  }
}

export default Container;
