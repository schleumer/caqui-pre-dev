import React, { PropTypes } from 'react'
import Base from './base'
import { createEvent, modelize } from '../helpers'

/**
 * TODO: PropTypes
 */
class ValuedTabs extends Base {
  static propTypes = {
    caquiRelatedForm: PropTypes.string
  }

  constructor(props) {
    super(props)
    this.displayName = 'ValuedTabs'
    this.state = {
      activeTab: null
    }

    this.selectTab = this.selectTab.bind(this)
  }

  selectTab(tab) {
    return (evt) => {
      this.setValue(tab)

      if (this.props.onChange) {
        this.props.onChange(createEvent(evt, this, tab))
      }
    }
  }

  childrenNotPresent() {
    return !this.props.children || !Array.isArray(this.props.children) || !this.props.children > 0
  }

  getFirstChild() {
    if (!this.childrenNotPresent()) {
      return this.props.children[0].props.id
    }

    return null
  }

  componentWillMount() {
    this.setState({
      activeTab: this.getFirstChild()
    })
  }

  componentWillReceiveProps() {
    this.forceUpdate()
  }

  getValue() {
    return this.state.activeTab
  }

  setValue(value) {
    this.setState({
      activeTab: value || this.getFirstChild()
    })
  }

  render() {
    const tabs = []
    //<li role="presentation" className="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">Home</a></li>
    if (this.childrenNotPresent()) {
      return <b>Não há items</b>
    }

    let active = null

    for (const item of this.props.children) {
      // TODO: use classnames
      let className = ''

      if (item.props.id == this.state.activeTab) {
        className += 'active'
        active = item
      }

      tabs.push((
        <li
          role="presentation"
          key={ item.props.id }
          onClick={ this.selectTab( item.props.id ) }
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

    if (!active) {
      active = this.props.children[0]
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

export default modelize(ValuedTabs)
