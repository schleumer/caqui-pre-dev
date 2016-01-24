import React, { PropTypes } from 'react';

import Form from './form';

import AlertBox from './alertBox';

import Base from './base';

import { createEvent, modelize } from '../helpers';

import * as system from '../system';

import * as Styles from '../styles';

const styles = Styles.textInput;

let objectId = 1;

class TextInput extends Base {
  static propTypes = {
    form: PropTypes.string
  };
  constructor(props) {
    super(props);
    // just for control
    this.objectId = objectId++;

    this.displayName = 'TextInput';
    this.state = {
      value: null
    }

    this.onChange = this.onChange.bind(this);

    this.inputDebounce = null;
  }
  onChange(evt) {
    const newValue = evt.target.value;

    this.setValue(newValue);

    if (this.inputDebounce) {
      clearTimeout(this.inputDebounce);
    }

    // to avoid junk throw
    // TODO: maybe a helper for debounce would be cool
    this.inputDebounce = setTimeout(() => {
      if (this.props.onChange) {
        this.props.onChange(createEvent(evt, this, newValue));
      }
    }, system.bounceTime);

  }
  getValue() {
    return this.state.value;
  }
  getImmediateValue() {
    return this.refs.input.value;
  }
  setValue(value) {
    this.setState({
      value: value
    });
  }
  makeId(props) {
    const nextId = [props.form, props.name].filter(x => !!x);
    if (nextId.length) {
      this.id = nextId.join('.');
    } else {
      this.id = null;
    }
  }
  componentWillReceiveProps(props) {
    this.makeId(props);
  }
  componentWillMount() {
    this.state.value = this.props.value || null;
    this.makeId(this.props);
  }
  focus() {
    this.refs.input.focus();
  }
  render() {
    // @todo helper
    const label = this.props.label || null;
    const placeholder = this.props.placeholder || label;
    let style = { ...styles.normal, ...this.props.style };
    let props = this.props;

    let alertBox = null;

    if (this.id) {
      alertBox = <AlertBox silence={ true } namespace={ this.id } />;
    }

    return (
      <Form.Group>
        { label && <label>
                     { label }
                   </label> }
        <input
          {...props}
          type="text"
          style={ style }
          placeholder={ placeholder }
          onChange={ this.onChange }
          value={ this.state.value }
          ref="input" />
        { alertBox }
      </Form.Group>
      );
  }
}

export default modelize(TextInput);
