import React from 'react'

/**
 * TODO: PropTypes
 */
class Body extends React.Component {
  render() {
    // if (this.props.children) {
    // }
    return (
      <div>
        Modal Body
      </div>
    )
  }
}

/**
 * TODO: PropTypes
 */
class Footer extends React.Component {
  render() {
    if (this.props.children) {
      //return ()
    }
    return (
      <div>
        <button
          type="button"
          className="btn btn-default"
          data-dismiss="modal">
          Close
        </button>
        <button
          type="button"
          className="btn btn-primary">
          Save changes
        </button>
      </div>
    )
  }
}

/**
 * TODO: PropTypes
 */
class Header extends React.Component {
  render() {
    if (this.props.children) {
      return (
        <div>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close">
            <span aria-hidden="true">&times</span>
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
          <span aria-hidden="true">&times</span>
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

  constructor(props) {
    super(props)
    this.displayName = 'Modal'
  }

  getHeader(children) {
    if (Array.isArray(children)) {
      const el = children.filter((comp) => comp.type.name == 'Header').shift()
      if (el) {
        return el
      }
    }
    return <Header />
  }

  getBody(children) {
    if (Array.isArray(children)) {
      const el = children.filter((comp) => comp.type.name == 'Body').shift()
      if (el) {
        return el
      }
    }
    return <Body />
  }

  getFooter(children) {
    if (Array.isArray(children)) {
      const el = children.filter((comp) => comp.type.name == 'Footer').shift()
      if (el) {
        return el
      }
    }
    return <Footer />
  }

  render() {
    const style = {
      overflow: 'auto'
    }

    const { children } = this.props

    const header = this.getHeader(children)
    const body = this.getBody(children)
    const footer = this.getFooter(children)

    return (
      <div style={ { display: this.props.isVisible ? 'block' : 'none' } }>
        <div className="modal-backdrop fade in"></div>
        <div
          className="modal show"
          tabindex="-1"
          role="dialog"
          style={ style }>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                { header }
              </div>
              <div className="modal-body">
                { body }
              </div>
              <div className="modal-footer">
                { footer }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Modal
