import React from 'react'

import classNames from 'classnames'
import isRequiredForA11y from 'react-prop-types/lib/isRequiredForA11y'

class Tooltip extends React.Component {
  static propTypes = {
    /**
     * An html id attribute, necessary for accessibility
     * @type {string|number}
     * @required
     */
    id: isRequiredForA11y(React.PropTypes.oneOfType([
      React.PropTypes.string, React.PropTypes.number
    ])),

    /**
     * Sets the direction the Tooltip is positioned towards.
     */
    placement: React.PropTypes.oneOf([ 'top', 'right', 'bottom', 'left' ]),

    /**
     * The "top" position value for the Tooltip.
     */
    positionTop: React.PropTypes.oneOfType([
      React.PropTypes.number, React.PropTypes.string
    ]),
    /**
     * The "left" position value for the Tooltip.
     */
    positionLeft: React.PropTypes.oneOfType([
      React.PropTypes.number, React.PropTypes.string
    ]),

    /**
     * The "top" position value for the Tooltip arrow.
     */
    arrowOffsetTop: React.PropTypes.oneOfType([
      React.PropTypes.number, React.PropTypes.string
    ]),
    /**
     * The "left" position value for the Tooltip arrow.
     */
    arrowOffsetLeft: React.PropTypes.oneOfType([
      React.PropTypes.number, React.PropTypes.string
    ])
  };

  static defaultProps = {
    placement: 'right'
  };

  render() {
    const {
      placement,
      positionTop,
      positionLeft,
      arrowOffsetTop,
      arrowOffsetLeft,
      className,
      style,
      children,
      ...props
    } = this.props

    //const [ bsProps, elementProp ] = splitBsProps(props);

    const classes = {
      'tooltip': true,
      [placement]: true
    }

    const outerStyle = {
      top: positionTop,
      left: positionLeft,
      ...style
    }

    const arrowStyle = {
      top: arrowOffsetTop,
      left: arrowOffsetLeft
    }

    return (
      <div
        {...props}
        role="tooltip"
        className={classNames(className, classes)}
        style={outerStyle}
      >
        <div className="tooltip-arrow" style={arrowStyle}/>

        <div className="tooltip-inner">
          {children}
        </div>
      </div>
    )
  }
}

export default Tooltip;