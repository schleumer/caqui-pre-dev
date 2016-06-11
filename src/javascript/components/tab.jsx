import React from 'react'
import Base from './base'

/**
 * TODO: PropTypes
 */
class Tab extends Base {
  constructor(props) {
    super(props)
    this.displayName = 'Tab'
  }

  render() {
    return (<div style={ { paddingTop: '20px' } }>
      { this.props.children }
    </div>)
  }
}

export default Tab
