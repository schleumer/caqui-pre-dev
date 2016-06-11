import React from 'react'
import cx from 'classnames'
import Icon from './icon'
import Base from './base'
import { Link } from 'react-router'

class Group extends Base {
  constructor(props) {
    super(props)
    this.displayName = 'Button.Group'
  }

  render() {
    return (
      <div className="caqui-button-group">
        { this.props.children }
      </div>
    )
  }
}

/**
 * TODO: PropTypes, ButtonGroups
 */
class Button extends Base {
  static Default = 'caqui-button-default'
  static Primary = 'caqui-button-primary'
  static Success = 'caqui-button-success'
  static Info = 'caqui-button-info'
  static Danger = 'caqui-button-danger'
  static Warning = 'caqui-button-warning'
  static Link = 'caqui-button-link'
  static ExtraSmall = 'caqui-button-xs'
  static Small = 'caqui-button-sm'
  static Large = 'caqui-button-lg'
  static Group = Group

  static defaultProps = {
    type: 'caqui-button-default',
    label: null,
    submit: false,
    to: null,
    icon: null,
    size: null,
    text: null
  }

  constructor(props) {
    super(props)
    this.displayName = 'Button'
  }

  render() {
    const { type, className, icon, size, to, submit, text, children, block } = this.props

    const classNames = cx('caqui-button', type, className, size, {
      'caqui-button-block': block
    })

    let iconEl = null

    if (icon) {
      iconEl = (
        <Icon
          name={ icon }
          style={ { marginRight: '5px' } }/>
      )
    }

    const props = {
      ...this.props,
      type: null,
      size: null,
      to: null,
      submit: null,
      className: classNames
    }

    if (!to) {
      return (
        <button
          {...props}
          type={ submit ? 'submit' : 'button' }>
          <span>{ iconEl }</span>
          <span>{ children || text }</span>
        </button>
      )
    } else {
      return (
        <Link {...props}>
          <span>{ iconEl }</span>
          <span>{ children || text }</span>
        </Link>
      )
    }
  }
}

export default Button
