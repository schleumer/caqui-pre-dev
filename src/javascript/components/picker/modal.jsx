import React from 'react'

import CaquiModal from '../modal'

/**
 * TODO: PropTypes
 */
class Modal extends React.Component {
  constructor(props) {
    super(props)
    this.displayName = 'Picker(Modal)'
  }

  render() {
    return (
      <div>
        <CaquiModal />
        Picker(Modal)
      </div>
    )
  }
}

export default Modal
