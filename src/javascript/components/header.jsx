import React from 'react'
import Base from './base'

/**
 * TODO: PropTypes
 */
class Header extends Base {
  static Primary = 'primary'
  static Secondary = 'secondary'

  constructor(props) {
    super(props)
    this.displayName = 'Header'
  }

  render() {
    const size = this.props.size || 'default'
    let el
    switch (size) {
      case Header.Primary:
        el = <h1>{ this.props.children }</h1>
        break
      case Header.Secondary:
      default:
        el = <h2>{ this.props.children }</h2>
    }
    return el
  }
}

export default Header
