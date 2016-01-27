import React from 'react';

import Base from '../base';

import * as Styles from '../../styles';

const styles = Styles.form;

class Group extends Base {
  constructor(props) {
    super(props);
    this.displayName = 'Form.Group';
  }

  render() {
    const children = this.props.children;

    return (
      <div style={styles.group}>
        { children }
      </div>
      );
  }
}

export default Group;
