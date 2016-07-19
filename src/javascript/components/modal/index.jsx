import React, { PropTypes } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Header from './header'
import Body from './body'
import Footer from './footer'

class Modal extends React.Component {
  static Header = Header
  static Body = Body
  static Footer = Footer

  static propTypes = {
    secondaryText: PropTypes.node,
    primaryText: PropTypes.node,
    onPrimaryClick: PropTypes.func,
    onSecondaryClick: PropTypes.func,
    withSecondary: PropTypes.bool,
    isVisible: PropTypes.bool,
    title: PropTypes.node
  }

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
      this.onClose()
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
      <Header onClose={this.onClose} title={this.props.title} />
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
            tabIndex="-1"
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
