import React from 'react';

import cx from 'classnames';

import Icon from './icon';

import Base from './base';

import { Link } from 'react-router';

class Button extends Base {
  static defaultProps = {
    type: "caqui-button-default",
    label: null,
    submit: false,
    to: null,
    icon: null,
    size: null,
    text: null
  };
  constructor(props) {
    super(props);
    this.displayName = 'Button';
  }
  render() {
    const {
      type,
      className,
      icon,
      size,
      to,
      submit,
      text,
      children,
      block
    } = this.props;

    const classNames = cx("caqui-button", type, className, size, {
      "caqui-button-block": block
    });

    let iconEl = null;

    if (icon) {
      iconEl = <Icon name={ icon } style={ {  marginRight: '5px'} } />
    }

    const props = {
      ...this.props,
      type: null,
      size: null,
      to: null,
      submit: null,

      className: classNames
    };

    if(!to) {
      return (
        <button {...props} type={ submit ? "submit" : "button" }>
          <span>
            { icon }
          </span>
          <span>
            { children || text }
          </span>
        </button>
        );
    } else {
      return (
        <Link {...props}>
          <span>
            { icon }
          </span>
          <span>
            { children || text }
          </span>
        </Link>
        );
    }
  }
}

class Group extends Base {
  constructor(props) {
    super(props);
    this.displayName = 'Button.Group';
  }

  render() {
    return (
      <div className="caqui-button-group">
        { this.props.children }
      </div>
      );
  }
}

Button.Default = "caqui-button-default";
Button.Primary = "caqui-button-primary";
Button.Success = "caqui-button-success";
Button.Info = "caqui-button-info";
Button.Danger = "caqui-button-danger";
Button.Warning = "caqui-button-warning";
Button.Link = "caqui-button-link";
Button.Group = Group;
Button.ExtraSmall = 'caqui-button-xs';
Button.Small = 'caqui-button-sm';
Button.Large = 'caqui-button-lg';

export default Button;