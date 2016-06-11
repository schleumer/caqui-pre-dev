import React from 'react'
import Left from './left'
import Right from './right'
import Base from '../../../base'

/**
 * TODO: PropTypes
 */
class Menu extends Base {
  constructor(props) {
    super(props)
    this.displayName = 'Page.Container.Menu'
  }

  render() {

    return (
      <div className="row"
           style={ { marginBottom: '15px', marginTop: '5px' } }>
        <div className="col-xs-12">
          { this.props.children }
        </div>
      </div>
    )
  }
}

Menu.Left = Left
Menu.Right = Right

export default Menu
