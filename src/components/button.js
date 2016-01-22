import React from 'react';

import Icon from './icon';

import Base from './base';

import { Link } from 'react-router';

class Button extends Base {
  static defaultProps = {
    type: "btn-default"
  };
  constructor(props) {
    super(props);
    this.displayName = 'Button';
  }
  render() {
    const props = {
      ...this.props
    };

    const submit = props.submit || false,
      elClass = this.props.className || "",
      className = ["btn", this.props.type].concat(elClass.split(' '));

    let icon = null;

    if (props.icon) {
      icon = <Icon name={ props.icon } style={ {  marginRight: '5px'} } />
    }

    if (props.size) {
      className.push(props.size);
    }

    props.className = className.join(' ');

    if(!this.props.to) {
      return (
        <button type={ submit ? "submit" : "button" } {...props}>
          { icon }
          { this.props.children || this.props.text }
        </button>
        );
    } else {
      return (
        <Link {...props}>
          { icon }
          { this.props.children || this.props.text }
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
      <div className="btn-group">
        { this.props.children }
      </div>
      );
  }
}

Button.Default = "btn-default";
Button.Primary = "btn-primary";
Button.Success = "btn-success";
Button.Info = "btn-info";
Button.Danger = "btn-danger";
Button.Warning = "btn-warning";
Button.Link = "btn-link";
Button.Group = Group;
Button.ExtraSmall = 'btn-xs';
Button.Small = 'btn-sm';
Button.Large = 'btn-lg';

export default Button;
