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
    const { type, className } = this.props

    const {
      label,
      submit,
      to,
      icon,
      size,
      text,
      block,
      children,
      ...buttonProps
    } = this.props;

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

    if (!to) {
      return (
        <button
          {...buttonProps}
          type={ submit ? 'submit' : 'button' }
          className={classNames}>
          <span>{ iconEl }</span>
          <span>{ children || text }</span>
        </button>
      )
    } else {
      return (
        <Link {...buttonProps} className={classNames}>
          <span>{ iconEl }</span>
          <span>{ children || text }</span>
        </Link>
      )
    }
  }
}

export default Button
