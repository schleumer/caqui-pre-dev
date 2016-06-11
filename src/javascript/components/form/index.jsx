import React from 'react'
import AlertBox from '../alertBox'
import Component from './component'
import Group from './group'
import Footer from './footer'

/**
 * TODO: PropTypes
 */
class Form extends Component {

  static contextTypes = {
    caquiRelatedForm: React.PropTypes.string,
    caquiModel: React.PropTypes.any
  }

  static defaultProps = {
    form: true
  }

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

  componentWillMount() {
    if (this.props.resetOnMount) {
      this.props.model.reset()
    }
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

    if (this.props.form) {
      return (
        <form {...props}>
          <AlertBox namespace={ props.name }/>
          { props.children }
        </form>
      )
    } else {
      return (
        <div {...props}>
          <AlertBox namespace={ props.name }/>
          { props.children }
        </div>
      )
    }
  }
}

Form.Group = Group
Form.Footer = Footer

export default Form
