import React from 'react'

import { createEvent, modelize, oid } from '../helpers'

/**
 * TODO: PropTypes
 * Isolate component from parent's model context.
 */
class CheckBox extends React.Component {
  static defaultProps = {
    label: null,
    placeholder: null
  }

  static contextTypes = {
    caquiRelatedForm: React.PropTypes.string,
    caquiModel: React.PropTypes.any
  }

  constructor(props) {
    super(props)
    this.displayName = 'CheckBox'
    this.oid = oid()

    this.onChange = this.onChange.bind(this)

    this.state = {
      value: !!props.checked || false
    }
  }

  getValue() {
    return this.state.value
  }

  getImmediateValue() {
    return !!this.refs.input.checked || false
  }

  setValue(value) {
    this.setState({
      value: value
    })
  }

  onChange(evt) {
    const newValue = !!evt.target.checked || false

    this.setValue(newValue)

    if (this.props.onChange) {
      this.props.onChange(createEvent(evt, this, newValue))
    }
  }

  render() {
    const id = `checkbox-${this.oid}`

    return (
      <div>
        <input
          id={id}
          type="checkbox"
          className="caqui-checkbox"
          onChange={this.onChange}
          checked={!!this.state.value || false}
          ref="input" />
        <label htmlFor={id} className="caqui-checkbox-label">{this.props.children}</label>
      </div>
    )
  }
}

export default modelize(CheckBox)
