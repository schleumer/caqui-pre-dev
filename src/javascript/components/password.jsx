import React from 'react';

import Form from './form';

import AlertBox from './alertBox';

import Base from './base';

class TextInput extends Base {
  constructor(props) {
    super(props);
    this.displayName = 'TextInput';
    this.state = {
      value: null
    }

    this.onChange = this.onChange.bind(this);
  }

  onChange(evt) {
    this.setState({
      value: evt.target.value
    });

    if (this.props.onChange) {
      this.props.onChange(evt);
    }
  }

  getValue() {
    return this.state.value;
  }

  componentWillReceiveProps(nextProps) {
    const nextId = [nextProps.relatedForm, nextProps.name].filter(x => !!x);
    if (nextId.length) {
      this.id = nextId.join('.');
    } else {
      this.id = null;
    }
  }

  componentWillMount() {
    this.state.value = this.props.value || null;
  }

  render() {
    // @todo helper
    const label = this.props.label || null;
    const placeholder = this.props.placeholder || label;
    let alertBox = null;

    if (this.id) {
      alertBox = <AlertBox silence={ true } namespace={ this.id } />;
    }

    return (
      <Form.Group>
        { label && <label>
                     { label }
                   </label> }
        <input type="password" className="form-control" placeholder={ placeholder } onChange={ this.onChange } value={ this.state.value } />
        { alertBox }
      </Form.Group>
      );
  }
}

export default TextInput;
