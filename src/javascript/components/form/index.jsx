import React from 'react'
import AlertBox from '../alertBox'
import Component from './component'
import Group from './group'
import Footer from './footer'

/**
 * TODO: PropTypes
 */
class Form extends Component {
  constructor(props) {
    super(props)

    this.displayName = 'Form'
    this.created = new Date()

    this.submit = this.submit.bind(this)
    this.undo = this.undo.bind(this)
  }

  submit(evt) {
    evt.preventDefault()

    const { model } = this.props
    let value = null

    if (model) {
      value = model.getValue()
    }

    this.props.onSubmit && this.props.onSubmit(value, evt)
  }

  undo() {
    const { model } = this.props

    if (model) {
      model.undo()
    }
  }

  render() {
    const props = {
      ...this.props,
      onSubmit: this.submit
    }

    return (
      <form {...props}>
        <AlertBox namespace={ props.name }/>
        { props.children }
      </form>
    )
  }
}


Form.Group = Group
Form.Footer = Footer

export default Form
