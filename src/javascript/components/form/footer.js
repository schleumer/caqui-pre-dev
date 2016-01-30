import React from 'react';

import Base from '../base';

class Footer extends Base {
  constructor(props) {
    super(props);
    this.displayName = 'Form.Footer';
  }
  render() {
    const props = {
      ...this.props
    }
    const style = {
      ...props.style
    };
    if (this.props.gravity) {
      style.textAlign = this.props.gravity;
    }
    props.style = style;

    return (<div {...props}>
              { this.props.children }
            </div>);
  }
}

export default Footer;
