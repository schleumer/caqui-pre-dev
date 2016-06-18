import React from 'react'

/**
 * TODO: PropTypes
 */
class Header extends React.Component {
  constructor(props) {
    super(props)

    this.onClose = this.onClose.bind(this)
  }

  onClose() {
    if (this.props.onClose) {
      this.props.onClose()
    }
  }

  render() {
    if (this.props.children) {
      return (
        <div>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={this.onClose}>
            <span aria-hidden="true">&times;</span>
          </button>
          { this.props.children }
        </div>
      )
    }

    return (
      <div>
        <button
          type="button"
          className="close"
          data-dismiss="modal"
          aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <h4 className="modal-title">Modal title</h4>
      </div>
    )
  }
}

export default Header
