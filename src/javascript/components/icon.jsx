import React from 'react';
import cx from 'classnames';
import Base from './base';

class Icon extends Base {
  constructor(props) {
    super(props);
    this.displayName = 'Icon';
  }

  render() {
    const style = {
      //width: '16px',
      //height: '16px',
      //verticalAlign: 'text-bottom',
      //position: 'relative',
      ...this.props.style
    };
    const classNames = cx("caqui-icon", this.props.className);

    let name = this.props.name;

    // special icon ;)
    if (name == 'backward') {
      name = 'forward';
      style.transform = 'rotate(180deg)';
    } else if (name == 'sign-out') {
      name = 'sign-in';
      style.transform = 'rotate(180deg)';
    }

    return (
      <svg className={ classNames } style={ style }>
        <use xlinkHref={ "#" + name }></use>
      </svg>
      );
  }
}

export default Icon;
