import React from 'react'
import Base from './base'

/**
 * TODO: PropTypes
 */
class Text extends Base {
  constructor(props) {
    super(props)
    this.displayName = 'Text'
  }

  render() {
    return (
      <div>
        { this.props.children }
      </div>
    )
  }
}

export default Text
