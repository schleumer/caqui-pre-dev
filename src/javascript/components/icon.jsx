import React from 'react'
import cx from 'classnames'
import Base from './base'

/**
 * TODO: PropTypes
 */
class Icon extends Base {
  constructor(props) {
    super(props)
    this.displayName = 'Icon'
  }

  render() {
    const style = {
      ...this.props.style
    }

    const classNames = cx('caqui-icon', this.props.className)

    let name = this.props.name

    // special icon )
    if (name == 'backward') {
      name = 'forward'
      style.transform = 'rotate(180deg)'
    } else if (name == 'sign-out') {
      name = 'sign-in'
      style.transform = 'rotate(180deg)'
    }

    return (
      <svg
        className={ classNames }
        style={ style }>
        <use xlinkHref={ `#${name}` }/>
      </svg>
    )
  }
}

export default Icon
