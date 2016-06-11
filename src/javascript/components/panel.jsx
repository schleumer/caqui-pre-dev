import React from 'react'
import Icon from './icon'
import Base from './base'

/**
 * TODO: PropTypes
 */
class Panel extends Base {
  constructor(props) {
    super(props)
    this.displayName = 'Panel'
  }

  render() {
    // TODO stuffs
    let header = this.props.header

    const className = [
      'panel',
      this.props.type ? `panel-${this.props.type}` : 'panel-default'
    ]

    if (this.props.className) {
      className.push(this.props.className)
    }

    if (this.props.icon) {
      header = (
        <div>
          <Icon
            name={ this.props.icon }
            style={ { width: '30px', height: '30px', marginTop: '-10px', top: '5px', marginRight: '10px' } }/>
          { header }
        </div>
      )
    }

    const props = {
      className: className.join(' '),
      ...this.props
    }

    return (
      <div {...props}>
        <div className="panel-heading">
          { header }
        </div>
        <div className="panel-body">
          { this.props.children }
        </div>
      </div>
    )
  }
}

export default Panel
