import React from 'react';

class Base extends React.Component {
  static NON_NATIVE = true;

  constructor(props) {
    super(props);
    this.displayName = 'Base';
  }
}

export default Base;
