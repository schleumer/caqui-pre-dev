import React from 'react'
import cx from 'classnames'
import Base from './base'

/**
 * TODO: PropTypes
 */
class Container extends Base {
  constructor(props) {
    super(props)
    this.displayName = 'Container'
  }

  render() {
    // @todo coding style

    const classes = cx(this.props.className, {
      'caqui-container': !this.props.fluid,
      'caqui-container-fluid': this.props.fluid
    })

    return (
      <div
        {...this.props}
        className={ classes }>
        { this.props.children }
      </div>
    )
  }
}

export default Container
