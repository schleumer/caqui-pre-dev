import React, { PropTypes } from 'react'
import CaquiModal from '../modal'
import CheckBox from '../checkBox'
import Cage from '../cage'

class Item extends React.Component {
  static propTypes = {
    isVisible: PropTypes.bool,
    onUnchecked: PropTypes.func.isRequired,
    onChecked: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)

    this.onChange = this.onChange.bind(this)
  }

  onChange(event) {
    if (event.target.checked) {
      this.props.adapter.check(this.props.item)
      this.props.onChecked(this.props.item)
    } else {
      this.props.adapter.uncheck(this.props.item)
      this.props.onUnchecked(this.props.item)
    }
  }

  render() {
    const { item, indexedItems, itemLabel } = this.props

    const id = `checkbox-${this.oid}-${item.key}`

    return (
      <Cage>
        <CheckBox
          id={id}
          type="checkbox"
          className="caqui-checkbox"
          onChange={this.onChange}
          checked={indexedItems.indexOf(item.key) > -1}>
          {itemLabel(item.value)}
        </CheckBox>
      </Cage>
    )
  }
}

class Modal extends React.Component {
  static propTypes = {
    isVisible: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    itemLabel: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.displayName = 'Picker(Modal)'

    this.onItemChecked = this.onItemChecked.bind(this)
    this.onItemUnchecked = this.onItemUnchecked.bind(this)
  }

  onItemChecked() {
    this.props.onChange()
  }

  onItemUnchecked() {
    this.props.onChange()
  }

  render() {
    const items = this.props.items.map(item => {
      return (
        <Item
          key={this.props.itemKey(item.value)}
          adapter={this.props.adapter}
          item={item}
          itemLabel={this.props.itemLabel}
          checkedItems={this.props.checkedItems}
          indexedItems={this.props.indexedItems}
          onChecked={this.onItemChecked}
          onUnchecked={this.onItemUnchecked}/>
      )
    })

    return (
      <div>
        <CaquiModal isVisible={this.props.isVisible} onClose={this.props.onClose}>
          { items }
        </CaquiModal>
      </div>
    )
  }
}

export default Modal
