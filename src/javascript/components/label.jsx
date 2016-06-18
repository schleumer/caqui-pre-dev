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

    return (
      <div>
        {text}{hintBox}
      </div>
    )
  }
}

export default Label
