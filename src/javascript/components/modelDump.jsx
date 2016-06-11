import React, { PropTypes } from 'react'
import { modelize } from '../helpers'

/**
 * TODO: PropTypes
 */
class ModelDump extends React.Component {
  static contextTypes = {
    caquiRelatedForm: PropTypes.string
  }

  constructor(props) {
    super(props)
    this.displayName = 'ModelDump'
    this.state = {
      value: null
    }
  }

  setValue(value) {
    this.setState({
      value
    })
  }

  getValue() {
    return null
  }

  render() {
    return <pre>{ JSON.stringify(this.state.value, null, 2) }</pre>
  }
}

export default modelize(ModelDump)
