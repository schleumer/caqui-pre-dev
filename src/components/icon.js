import React from 'react';

import Base from './base';

class Icon extends Base {
  constructor(props) {
    super(props);
    this.displayName = 'Icon';
  }

  render() {
    const style = {
      width: '16px',
      height: '16px',
      verticalAlign: 'text-bottom',
      position: 'relative',
      ...this.props.style
    };

    let classes = ["icon"];
    let name = this.props.name;

    if (this.props.className) {
      classes = classes.concat(this.props.className.split(' '));
    }

    // spacial icon ;)
    if (name == 'backward') {
      name = 'forward';
      style.transform = 'rotate(180deg)';
    } else if (name == 'sign-out') {
      name = 'sign-in';
      style.transform = 'rotate(180deg)';
    }

    return (
      <svg className={ classes.join(' ') } style={ style }>
        <use xlinkHref={ "#icon-" + name }></use>
      </svg>
      );
  }
}

export default Icon;
