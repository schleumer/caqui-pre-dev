import React from 'react'
import Icon from '../icon'
import Cage from '../cage'
import FakeTextInput from '../fakeTextInput'

export default class Shadow extends React.Component {
  constructor(props) {
    super(props)

    this.displayFocused = this.displayFocused.bind(this)
    this.trash = this.trash.bind(this)
  }

  displayFocused() {
    this.refs.displayer.tabIndex = -1

    const { store } = this.props

    store.dispatch(store.actions.open())
  }

  unfocus() {
    this.refs.displayer.tabIndex = 0
  }

  focus() {
    this.refs.displayer.dispatch('focus')
  }

  trash() {
    if (this.props.onTrash) {
      this.props.onTrash()
    }
  }

  render() {
    const { /*itemKey, */itemLabel, store } = this.props

    const data = store.getState()

    let label = 'Selecione uma opção'
    let value = null

    if (data.selected) {
      value = itemLabel(data.selected)
    }

    let icon = null

    if (data.selected) {
      icon = (
        <div
          className="caqui-combobox-trash-icon"
          onClick={ this.trash }>
          <Icon name="trash"/>
        </div>
      )
    } else {
      icon = (
        <div className="caqui-combobox-shadow-icon">
          <Icon name="magnify"/>
        </div>
      )
    }

    //<span className="caqui-combobox-shadow">{ label }</span>
    return (
      <div style={ { position: 'relative' } }>
        <Cage>
          <FakeTextInput
            tabIndex={ data.open ? '-1' : '0' }
            onFocus={ this.displayFocused }
            onClick={ this.displayFocused }
            ref="displayer"
            className="caqui-combobox-shadow-holder"
            value={ value }
            placeholder={ label }>
          </FakeTextInput>
        </Cage>
        { icon }
      </div>
    )
  }
}
