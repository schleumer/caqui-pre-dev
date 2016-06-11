import React from 'react'
import Base from './base'

/**
 * TODO: PropTypes
 */
class Tabs extends Base {
  constructor(props) {
    super(props)
    this.displayName = 'Tabs'
    this.activeTab = null

    this.selectTab = this.selectTab.bind(this)
  }

  selectTab(tab) {
    return () => {
      this.activeTab = tab
      this.forceUpdate()
    }
  }

  componentWillReceiveProps() {
    this.forceUpdate()
  }

  render() {
    const tabs = []
    //<li role="presentation" className="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">Home</a></li>

    const active = this.activeTab || this.props.children[0]

    for (const item of this.props.children) {
      let className = ''
      if (item.props.id == active.props.id) {
        className += 'active'
      }
      tabs.push((
        <li
          role="presentation"
          key={ item.props.id }
          onClick={ this.selectTab(item) }
          className={ className }>
          <a
            href="javascript:"
            aria-controls="home"
            role="tab"
            data-toggle="tab"
            key={ item.props.header }>
            { item.props.header }
          </a>
        </li>
      ))
    }

    return (
      <div style={ { marginBottom: '20px' } }>
        <ul
          className="nav nav-tabs"
          role="tablist">
          { tabs }
        </ul>
        <div className="tab-content">
          <div
            role="tabpanel"
            className="tab-pane active">
            { active }
          </div>
        </div>
      </div>
    )
  }
}

export default Tabs
