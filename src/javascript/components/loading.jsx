import React from 'react'
import Base from './base'

/**
 * TODO: PropTypes
 */
class Loading extends Base {
  constructor(props) {
    super(props)
    this.displayName = 'Loading'
  }

  render() {
    const { state, message, subMessage } = this.props

    if (state) {
      return (
        <div className="caqui-loading">
          <div className="caqui-loading-holder">
            <div className="caqui-spinner">
              <div className="caqui-bounce1"></div>
              <div className="caqui-bounce2"></div>
              <div className="caqui-bounce3"></div>
            </div>
            <div>
              <b>{ message }</b>
            </div>
            <div>
              <b>{ subMessage }</b>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default Loading
