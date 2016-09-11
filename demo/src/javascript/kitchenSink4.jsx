import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as Caqui from '../../../src/javascript'

const { Components: { Row, Column, Editor } } = Caqui

class KitchenSink4 extends Component {
  constructor() {
    super()

    this.displayName = 'KitchenSink4'
  }

  render() {
    return (
      <div>
        <Row style={ { paddingTop: 20 } }>
          <Column>
            <Editor name="test_editor" label="Teste do Editor"/>
          </Column>
        </Row>
      </div>
    )
  }
}

const select = (state) => state

export default connect(select)(KitchenSink4)
