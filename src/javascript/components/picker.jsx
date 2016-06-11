import React from 'react'
import { /*createEvent, */modelize } from '../helpers'

/**
 * TODO: PropTypes
 */
class Picker extends React.Component {
  constructor(props) {
    super(props)
    this.displayName = 'Picker'

    this.state = {
      value: null
    }
  }

  getValue() {
    return this.state.value
  }

  getImmediateValue() {
    return this.state.value || null
  }

  setValue(value) {
    this.setState({
      value: value
    })
  }

  render() {
    return (
      <div>
        Picker
      </div>
    )
  }
}

export default modelize(Picker)
