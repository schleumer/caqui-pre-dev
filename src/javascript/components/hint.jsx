import React from 'react'
import Icon from './icon'

/**
 * TODO: PropTypes
 */
class Hint extends React.Component {
  constructor(props) {
    super(props)
    this.displayName = 'Hint'
  }

  render() {
    const { text } = this.props

    if (!text)
      return null

    return (
      <span>
        <div className="caqui-form-control-hint">
          <Icon
            name="help"
            className="hint-icon"/>
          <div className="hint">
            { text }
          </div>
        </div>
      </span>
    )
  }
}

export default Hint
