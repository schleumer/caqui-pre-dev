import React, { PropTypes } from 'react'
import Button from '../button'
import Form from '../form'
import Label from '../label'
import { modelize, createEvent } from '../../helpers'
import Modal from './modal'
import storeBuilder from './storeBuilder'

/**
 * TODO: PropTypes
 */
class Picker extends React.Component {
  static contextTypes = {
    caquiRelatedForm: PropTypes.string,
    caquiModel: PropTypes.any
  }

  static propTypes = {
    adapter: PropTypes.any
  }

  static defaultProps = {
    itemKey: _ => _.id,
    itemLabel: _ => _.name,
    valuedBy: _ => _
  }

  constructor(props) {
    super(props)
    this.displayName = 'Picker'

    this.unsafeUnmounted = false
    this.store = storeBuilder(props.adapter, props.valuedBy, props.itemKey)

    this.state = {
      value: null
    }

    this.toggleModal = this.toggleModal.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onConfirm = this.onConfirm.bind(this)
  }

  componentWillMount() {
    const store = this.store
    store.subscribe(() => {
      if (this.unsafeUnmounted) {
        return
      }

      const newState = store.getState()

      this.setState(newState)
    })
    store.touch()
  }

  componentWillReceiveProps(nextProps) {
    this.store = storeBuilder(nextProps.adapter, nextProps.valuedBy, nextProps.itemKey)
  }

  getValue() {
    return this.state.value
  }

  getImmediateValue() {
    return this.state.value || null
  }

  setValue(value) {
    this.store.update(value)
    this.setState({ value })
  }

  toggleModal() {
    //this.setState({ isModalVisible: !this.state.isModalVisible })
    this.store.toggleModal()
  }

  onChange() {

  }

  onConfirm() {
    const store = this.store
    const newState = store.getState()
    this.props.onChange && this.props.onChange(createEvent(null, this, newState.checked))
    this.setState({ value: newState.checked })
  }

  render() {
    const props = {
        ...this.props
      },
      { label } = props

    return (
      <Form.Group>
        <Label text={label} hint={"gtfo"}/>
        <div>
          <Modal
            isVisible={this.state.isModalVisible}
            adapter={this.store}
            onClose={this.toggleModal}
            itemLabel={this.props.itemLabel}
            itemKey={this.props.itemKey}
            items={this.state.items}
            indexedItems={this.state.index}
            checkedItems={this.state.checked}
            onChange={this.onChange}
            onConfirm={this.onConfirm}/>
          <Button onClick={this.toggleModal}>Selecionar</Button>
        </div>
      </Form.Group>
    )
  }
}

export default modelize(Picker)

