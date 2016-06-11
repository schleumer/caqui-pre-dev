import React, { PropTypes } from 'react'
import moment from 'moment'
import storeBuilder from './storeBuilder'
import DropDown from './dropDown'
import { createEvent, modelize } from '../../helpers'
import FakeTextInput from '../fakeTextInput'
import Icon from '../icon'
import Cage from '../cage'

/**
 * TODO: PropTypes
 */
class DateTime extends React.Component {
  static propTypes = {
    caquiRelatedForm: PropTypes.string,
    caquiModel: PropTypes.any,
    time: PropTypes.bool
  }

  static defaultProps = {
    time: true,
    placeholder: 'Pick a Date',
    icon: 'calendar'
  }

  constructor(props) {
    super(props)

    this.displayName = 'DateTime'
    this.inputFocused = this.inputFocused.bind(this)
    this.inputBlured = this.inputBlured.bind(this)
    this.datePicked = this.datePicked.bind(this)
    this.onTimeChanged = this.onTimeChanged.bind(this)

    this.unsubscribe = null
  }

  componentWillMount() {
    // TODO: THIS. IS. SO. WRONG.
    if (this.props.value) {
      const nextValue = moment.isMoment(this.props.value)
        ? this.props.value
        : moment(this.props.value)

      this.store = storeBuilder(nextValue.clone(), nextValue)
    } else {
      this.store = storeBuilder(moment())
    }

    this._subscribe()
  }

  _subscribe() {
    if (this.unsubscribe) {
      this.unsubscribe()
    }

    this.unsubscribe = this.store.subscribe(() => {
      this.setState(this.store.getState())
    })

    this.setState(this.store.getState())
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe()
    }
  }

  inputFocused() {
    if (this.state.opened) {
      return
    }
    this.store.dispatch(this.store.actions.open())
  }

  datePicked(value) {
    const { actions, dispatch } = this.store
    dispatch(actions.setValue(value, false))
    // TODO: ???
    this.refs.input.dispatch('blur')

    if (this.props.onChange) {
      this.props.onChange(createEvent(null, this, value))
    }
  }

  inputBlured(evt, id, originalEvent) {
    if (!this.state.opened) {
      return
    }

    const relatedTarget = evt.relatedTarget ||
      originalEvent.relatedTarget ||
      document.activeElement

    // TODO: this is wrong too, but out of my control.
    // SORRY, WORLD :(
    // https://github.com/facebook/react/issues/2011
    setTimeout(() => {
      const { actions } = this.store

      const holderDom = this.refs.holder,
        a = relatedTarget,
        b = a && holderDom.contains(a)

      if (!b) {
        this.store.dispatch(actions.close())
      } else {
        // TODO: this might cause chaos and destruction in the future, remove.
        // this.refs.input.focus()
      }
    }, 1)
  }

  getValue() {
    return this.state.value
  }

  onTimeChanged(value) {
    const { actions, dispatch } = this.store
    dispatch(actions.setValue(value))

    if (this.props.onChange) {
      this.props.onChange(createEvent(null, this, value))
    }
  }

  setValue(value) {
    const store = this.store
    if (value) {
      if (moment.isMoment(value)) {
        store.dispatch(store.actions.setValue(value))
      } else {
        store.dispatch(store.actions.setValue(moment(value)))
      }
    } else {
      store.dispatch(store.actions.setValue(null))
    }
    return value
  }

  render() {
    const { opened, current, value } = this.state

    const { displayFormat } = this.props

    const displayer = value && value.format(displayFormat || 'L LT')

    let label = null

    if (this.props.label) {
      label = (<label>
        { this.props.label }
      </label>)
    }

    let dropDown = null

    if (opened) {
      dropDown = (
        <DropDown
          store={ this.store }
          key={ current.format( 'YYYY-MM' ) }
          onDatePicked={ this.datePicked }
          onTimeChanged={ this.onTimeChanged }
          showTime={ this.props.time }/>
      )
    }

    return (
      <div className="form-group caqui-datetime-holder">
        { label }
        <div
          className="caqui-datetime-holder"
          ref="holder">
          <Cage>
            <FakeTextInput
              ref="input"
              value={ displayer }
              placeholder={ this.props.placeholder }
              onFocus={ this.inputFocused }
              onBlur={ this.inputBlured }/>
          </Cage>
          <div className="caqui-datetime-icon">
            <Icon name={ this.props.icon }/>
          </div>
          { dropDown }
        </div>
      </div>
    )
  }
}

export default modelize(DateTime)
