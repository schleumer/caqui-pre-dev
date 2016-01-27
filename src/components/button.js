import React, { PropTypes } from 'react';

import Icon from './icon';

import Base from './base';

import * as Styles from '../styles';
import * as system from '../system';

const styles = Styles.button;
const m = system.m;

class Button extends Base {
  static propTypes = {
    type: PropTypes.oneOf([
      "default",
      "primary",
      "success",
      "info",
      "danger",
      "warning",
      "link"
    ]),
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onMouseDown: PropTypes.func,
    onMouseUp: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func
  };

  static defaultProps = {
    type: "default",
    size: "default"
  };

  constructor(props) {
    super(props);
    this.displayName = 'Button';

    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);

    this.state = {
      pressed: false,
      focused: false,
      hovered: false
    }
  }
  onFocus() {
    this.setState({ focused: true });
    if(this.props.onFocus) {
      this.props.onFocus.apply(null, arguments);
    }
  }
  onBlur() {
    this.setState({ focused: false });

    if(this.props.onBlur) {
      this.props.onBlur.apply(null, arguments);
    }
  }
  onMouseDown() {
    this.setState({ pressed: true });

    if(this.props.onMouseDown) {
      this.props.onMouseDown.apply(null, arguments);
    }
  }
  onMouseUp() {
    this.setState({ pressed: false });

    if(this.props.onMouseUp) {
      this.props.onMouseUp.apply(null, arguments);
    }
  }
  onMouseEnter() {
    this.setState({ hovered: true });

    if(this.props.onMouseEnter) {
      this.props.onMouseEnter.apply(null, arguments);
    }
  }
  onMouseLeave() {
    this.setState({ hovered: false, pressed: false /* will avoid mouse pressed state while outside of the button */ });

    if(this.props.onMouseLeave) {
      this.props.onMouseLeave.apply(null, arguments);
    }
  }
  render() {
    const props = {
      ...this.props,
      onFocus: this.onFocus,
      onBlur: this.onBlur,
      onMouseDown: this.onMouseDown,
      onMouseUp: this.onMouseUp,
      onMouseEnter: this.onMouseEnter,
      onMouseLeave: this.onMouseLeave
    };

    const submit = props.submit || false;

    props.style = {
      ...styles.default,
      ...styles[props.type],
      ...styles.sizes[props.size],
      ...m(
        {},
        this.state.hovered && styles.variants.hovered[props.type],
        this.state.pressed && styles.variants.pressed[props.type],
        this.state.focused && styles.variants.focused[props.type]
      ),
      //...props.style
    };

    let icon = null;
    if (props.icon) {
      icon = <Icon name={ props.icon } style={ {  marginRight: '5px'} } />
    }

    if(!this.props.href) {
      return (
        <button type={ submit ? "submit" : "button" } {...props}>
          { icon }
          { this.props.children || this.props.text }
        </button>
        );
    } else {
      return (
        <a {...props}>
          { icon }
          { this.props.children || this.props.text }
        </a>
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

Button.Default = "default";
Button.Primary = "primary";
Button.Success = "success";
Button.Info = "info";
Button.Danger = "danger";
Button.Warning = "warning";
Button.Link = "link";
Button.Group = Group;
Button.ExtraSmall = 'extraSmall';
Button.Small = 'small';
Button.Large = 'large';

export default Button;
