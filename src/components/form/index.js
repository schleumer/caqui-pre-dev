import React from 'react';

import AlertBox from '../alertBox';

import Component from './component';

import Group from './group';
import Footer from './footer';
import Button from '../button';

class Form extends Component {
  constructor(props) {
    super(props);

    this.displayName = 'Form';
    this.created = new Date();

    this.submit = this.submit.bind(this);
    this.undo = this.undo.bind(this);
  }

  submit(e) {
    e.preventDefault();

    this.props.onSubmit && this.props.onSubmit(e);
  }

  undo() {
    const {model} = this.props;

    if (model) {
      model.undo();
    }
  }

  render() {
    console.log("Form rendered");

    let children = this.props.children;

    if (Array.isArray(children)) {
      children = this.walkThroughChildren(children);
    } else {
      children = this.walkThroughChildren([children]);
    }

    const props = {
      onSubmit: this.submit,
      ...this.props
    }

    return (
      <form {...props}>
        <AlertBox namespace={ this.props.name } />
        { children }
      </form>
      );
  }
}


Form.Group = Group;
Form.Footer = Footer;

export default Form;