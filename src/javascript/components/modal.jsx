import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

/**
 * TODO: PropTypes
 */
class Body extends React.Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

class Footer extends React.Component {
  constructor(props) {
    super(props)

    this.secondaryClicked = this.secondaryClicked.bind(this)
    this.primaryClicked = this.primaryClicked.bind(this)
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

/**
 * TODO: PropTypes
 */
class Modal extends React.Component {
  static Header = Header
  static Body = Body
  static Footer = Footer

  static defaultProps = {
    secondaryText: 'Close',
    primaryText: 'Ok',
    onPrimaryClick: null,
    onSecondaryClick: null,
    withSecondary: true,
    isVisible: false,
    title: null
  }

  constructor(props) {
    super(props)
    this.displayName = 'Modal'

    this.onClose = this.onClose.bind(this)
    this.onClickOut = this.onClickOut.bind(this)
    this.primaryClicked = this.primaryClicked.bind(this)
    this.secondaryClicked = this.secondaryClicked.bind(this)
  }

  onClickOut(evt) {
    if (this.refs.holder === evt.target) {
      this.onClose(evt)
    }
  }

  onClose() {
    if (this.props.onClose) {
      this.props.onClose()
    }
  }

  primaryClicked() {
    if (this.props.onPrimaryClick) {
      this.props.onPrimaryClick()
    }
  }

  secondaryClicked() {
    if (this.props.onSecondaryClick) {
      this.props.onSecondaryClick()
    } else {
      this.props.onClose()
    }
  }

  getHeader(children) {
    if (Array.isArray(children)) {
      const el = children.filter((comp) => comp.type.name == 'Header').shift()
      if (el) {
        return React.cloneElement(el, {
          onClose: this.onClose
        })
      }
    }

    return (
      <Header onClose={this.onClose}>
        {children}
      </Header>
    )
  }

  getBody(children) {
    if (Array.isArray(children)) {
      const el = children.filter((comp) => comp.type.name == 'Body').shift()
      if (el) {
        return el
      }
    }

    return (
      <Body>{children}</Body>
    )
  }

  getFooter(children) {
    if (Array.isArray(children)) {
      const el = children.filter((comp) => comp.type.name == 'Footer').shift()
      if (el) {
        console.log(el.props)
        return el
      }
    }

    return (
      <Footer
        secondaryText={this.props.secondaryText}
        primaryText={this.props.primaryText}
        withSecondary={this.props.withSecondary}
        onSecondaryClick={this.secondaryClicked}
        onPrimaryClick={this.primaryClicked}/>
    )
  }

  render() {
    const style = {
      overflow: 'auto'
    }

    let modal = null

    if (this.props.isVisible) {

      const { children } = this.props
      const header = this.getHeader(this.props.title || children)
      const body = this.getBody(children)
      const footer = this.getFooter(children)
      modal = (
        <div>
          <div className="modal-backdrop fade in"></div>
          <div
            ref="holder"
            className="modal show"
            tabindex="-1"
            role="dialog"
            onClick={this.onClickOut}
            style={ style }>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  { header }
                </div>
                <div className="modal-body">
                  { body }
                </div>

                { footer }
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div>
        <ReactCSSTransitionGroup
          transitionName="caqui-modal-anim"
          transitionEnterTimeout={350}
          transitionLeaveTimeout={350}>
          {modal}
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}

export default Modal
