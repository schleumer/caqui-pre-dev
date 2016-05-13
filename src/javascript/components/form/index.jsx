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

    const {model} = this.props;
    let value = null;

    if (model) {
      value = model.getValue();
    }

    this.props.onSubmit && this.props.onSubmit(value, e);
  }

  undo() {
    const {model} = this.props;

    if (model) {
      model.undo();
    }
  }

  render() {
    let children = this.props.children;

    if (Array.isArray(children)) {
      children = this.walkThroughChildren(children);
    } else {
      children = this.walkThroughChildren([children]);
    }

    const props = {
      ...this.props,
      onSubmit: this.submit
    }

    return (
      <form {...props}>
        <AlertBox namespace={ this.props.name } />
        { children }
        <button onClick={this.undo} type="button">desfazer</button>
      </form>
      );
  }
}


Form.Group = Group;
Form.Footer = Footer;

export default Form;