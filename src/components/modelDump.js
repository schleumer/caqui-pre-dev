import React, { PropTypes } from 'react';

import { createEvent, modelize } from '../helpers';

class ModelDump extends React.Component {
  static propTypes = {
    form: PropTypes.string
  };
  constructor(props) {
    super(props);
    this.displayName = 'ModelDump';
    this.state = {
      value: null
    };
  }
  setValue(value) {
    this.setState({
      value
    });
  }
  getValue() {
    return null;
  }
  render() {
    return <pre>{ JSON.stringify(this.state.value, null, 2) }</pre>;
  }
}

export default modelize(ModelDump);
