import React from 'react';

import Base from './base';

import * as Styles from '../styles';

const styles = Styles.container;

class Container extends Base {
  constructor(props) {
    super(props);
    this.displayName = 'Container';
  }
  render() {
    // @todo coding style
    let style = {
      ...styles.normal,
      ...this.props.style,
      width: '1280px'
    };

    //if (this.props.className) {
    //  className.push(this.props.className);
    //}

    return (
      <div {...this.props} style={ style }>
        { this.props.children }
      </div>
      );
  }
}

export default Container;
