import React, { PropTypes } from 'react'
import Form from './form'
import AlertBox from './alertBox'
import Base from './base'
import { createEvent, modelize } from '../helpers'
import * as system from '../system'

/// XXX: ?????????????
let objectId = 1

class TextInput extends Base {
  static propTypes = {
    caquiRelatedForm: PropTypes.string,
    label: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.element
    ]),
    placeholder: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.element
    ])
  }

  static defaultProps = {
    caquiRelatedForm: null,
    label: null,
    placeholder: null
  }

  constructor(props) {
    super(props)
    // just for control
    this.objectId = objectId++

    this.displayName = 'FakeTextInput'

    this.state = {
      value: null
    }

    this.onChange = this.onChange.bind(this)

    this.inputDebounce = null
  }

  onChange(evt) {
    const newValue = evt.target.value

    this.setValue(newValue)

    if (this.inputDebounce) {
      clearTimeout(this.inputDebounce)
    }

    // to avoid junk throw
    // TODO: maybe a helper for debounce would be cool
    this.inputDebounce = setTimeout(() => {
      if (this.props.onChange) {
        this.props.onChange(createEvent(evt, this, newValue))
      }
    }, system.bounceTime)
  }

  getValue() {
    return this.state.value
  }

  getImmediateValue() {
    return this.refs.input.value
  }

  setValue(value) {
    this.setState({
      value: value,
      focused: false
    })
  }

  makeId(props) {
    const nextId = [
      props.caquiRelatedForm,
      props.name
    ].filter(x => !!x)
    if (nextId.length) {
      this.id = nextId.join('.')
    } else {
      this.id = null
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      value: props.value
    })
    this.makeId(props)
  }

  componentWillMount() {
    this.setState({
      value: this.props.value
    })
    this.makeId(this.props)
  }

  focus() {
    this.refs.input.focus()
  }

  blur() {
    this.refs.input.blur()
  }

  render() {
    const props = this.props,
      { label, placeholder/*, className*/ } = props

    let alertBox = null

    if (this.id) {
      alertBox = (
        <AlertBox
          silence={ true }
          namespace={ this.id }/>
      )
    }

    const placeholderEl = <span className="caqui-fake-text-input-placeholder">{ placeholder || label }</span>

    return (
      <Form.Group {...props}>
        { label && <label>
          { label }
        </label> }
        <div
          className="caqui-fake-text-input"
          tabIndex={ props.tabIndex || '0' }
          ref="input">
          { (this.state.value || this.props.children) || placeholderEl }
        </div>
        { alertBox }
      </Form.Group>
    )
  }
}

export default modelize(TextInput)
