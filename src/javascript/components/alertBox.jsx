import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import * as actions from '../actions'
import Icon from './icon'
import Base from './base'

const select = createSelector(
  (state, props) => {
    return {
      errors: state.caquiErrors.filter(_ => _.field.indexOf(props.namespace) > -1),
      messages: state.caquiMessages.filter(_ => _.field.indexOf(props.namespace) > -1)
    }
  },
  _ => _
)

class ErrorBox extends Base {
  render() {
    if (this.props.silence) {
      return (
        <div
          className="text-danger"
          onClick={ this.props.onClick }>
          <Icon
            name="alert-circle"
            style={ { marginRight: '5px' } }/>
          <span>{ this.props.item.message }</span>
        </div>
      )
    } else {
      return (
        <div
          className="alert alert-danger"
          onClick={ this.props.onClick }>
          <Icon
            name="alert-circle"
            style={ { marginRight: '5px' } }/>
          <span>{ this.props.item.message }</span>
        </div>
      )
    }
  }
}

class MessageBox extends Base {
  render() {
    if (this.props.silence) {
      return (
        <div
          className="text-info"
          onClick={ this.props.onClick }>
          <Icon
            name="information"
            style={ { marginRight: '5px' } }/>
          <span>{ this.props.item.message }</span>
        </div>
      )
    } else {
      return (
        <div
          className="alert alert-info"
          onClick={ this.props.onClick }>
          <Icon
            name="information"
            style={ { marginRight: '5px' } }/>
          <span>{ this.props.item.message }</span>
        </div>
      )
    }
  }
}

/**
 * TODO: PropTypes
 */
class AlertBox extends Base {
  static propTypes = {
    namespace: PropTypes.string,
    silence: PropTypes.bool
  };

  static defaultProps = {
    namespace: 'general',
    silence: false
  };

  constructor(props) {
    super(props)
    this.displayName = 'AlertBox'
    this.forgetError = this.forgetError.bind(this)
    this.forgetMessage = this.forgetMessage.bind(this)
  }

  componentWillMount() {
    this.setState({
      namespace: this.props.namespace
    })
  }

  forgetError(item) {
    return () => {
      this.props.dispatch(actions.messages.forgetError(item))
    }
  }

  forgetMessage(item) {
    return () => {
      this.props.dispatch(actions.messages.forgetMessage(item))
    }
  }

  render() {
    const { errors, messages } = this.props

    const messagesBoxes = messages.map(_ => <MessageBox
      silence={ this.props.silence }
      key={ _.id }
      item={ _ }
      onClick={ this.forgetMessage( _ ) }/>)
    const errorsBoxes = errors.map(_ => <ErrorBox
      silence={ this.props.silence }
      key={ _.id }
      item={ _ }
      onClick={ this.forgetError( _ ) }/>)

    return (
      <div className="alert-box">
        <div className="alert-box__messages-boxes">
          { messagesBoxes }
        </div>
        <div className="alert-box__errors-boxes">
          { errorsBoxes }
        </div>
      </div>
    )
  }
}

export default connect(select)(AlertBox)
