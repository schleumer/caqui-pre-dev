import React, { PropTypes } from 'react'

class Footer extends React.Component {

  static propTypes = {
    primaryClicked: PropTypes.func,
    secondaryClicked: PropTypes.func,
    withSecondary: PropTypes.bool,
    primaryText: PropTypes.node,
    secondaryText: PropTypes.node
  }

  constructor(props) {
    super(props)

    this.primaryClicked = this.primaryClicked.bind(this)
    this.secondaryClicked = this.secondaryClicked.bind(this)
  }

  primaryClicked() {
    if (this.props.onPrimaryClick) {
      this.props.onPrimaryClick()
    }
  }

  secondaryClicked() {
    if (this.props.onSecondaryClick) {
      this.props.onSecondaryClick()
    }
  }

  render() {
    let secondaryButton = null

    if (this.props.withSecondary) {
      secondaryButton = (
        <button
          type="button"
          className="btn btn-default"
          data-dismiss="modal"
          onClick={this.secondaryClicked}>
          {this.props.secondaryText}
        </button>
      )
    }

    if (this.props.children) {
      return (
        <div>
          {secondaryButton}
          {this.props.children}
        </div>
      )
    }

    return (
      <div className="modal-footer">
        {secondaryButton}
        <button
          type="button"
          className="btn btn-primary"
          onClick={this.primaryClicked}>
          {this.props.primaryText}
        </button>
      </div>
    )
  }
}

export default Footer
