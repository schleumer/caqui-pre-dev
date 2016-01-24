import React from 'react';

import Base from './base';

import * as Styles from '../styles';
const styles = Styles.root;

class Row extends Base {
  constructor(props) {
    super(props);
    this.displayName = 'Row';
  }

  render() {
    // @todo coding style
    const rowStyle = this.props.fluid ? styles.rowFluid : styles.row;
    
    let style = {...rowStyle, ...this.props.style};

    return (
      <div {...this.props} style={ style }>
        { this.props.children }
      </div>
      );
  }
}

export default Row;
