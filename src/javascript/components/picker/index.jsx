import React, { PropTypes } from 'react'
import Button from '../button'
import Form from '../form'
import Label from '../label'

import { modelize } from '../../helpers'

/**
 * TODO: PropTypes
 */
class Picker extends React.Component {
  static contextTypes = {
    caquiRelatedForm: PropTypes.string,
    caquiModel: PropTypes.any
  }

  static defaultProps = {
    itemKey: _ => _.id,
    itemLabel: _ => _.name
  }

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
    const props = {
        ...this.props
      },
      { label } = props

    return (
      <Form.Group>
        <Label text={label} hint={"gtfo"} />
        <div>
          <Button>Selecionar</Button>
        </div>
      </Form.Group>
    )
  }
}

export default modelize(Picker)

