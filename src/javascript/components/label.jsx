import React from 'react'

import Icon from './icon'

/**
 * TODO: PropTypes
 */
class Label extends React.Component {
  constructor(props) {
    super(props)
    this.displayName = 'Label'
  }

  render() {
    const { text, hint } = this.props

    let hintBox = null

    if (hint) {
      hintBox = (
        <div className="caqui-label-hint">
          <Icon
            name="help-circle"
            className="hint-icon"/>
          <div className="hint">
            { hint }
          </div>
        </div>
      )
    }

    return (
      <div className="caqui-label">
        <label>{text}</label>{hintBox}
      </div>
    )
  }
}

export default Label
