import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as Caqui from '../../../lib/index'

const { Components: { Row, Column, Picker, Modal }, Helpers: { PagedStore: { pagedRemoteStore } } } = Caqui

const githubApi = ( /*query, limit, page*/ ) => '/example.json'
  //`https://api.github.com/search/repositories?q=${query}&sort=stars&order=desc&page=${page}`;
  

const githubApiResponse = ({ data }) => ({
  items: data.items,
  total: data.total_count
})


class KitchenSink3 extends Component {
  constructor() {
    super()

    this.displayName = 'KitchenSink3'

    this.test1Adapter = pagedRemoteStore( githubApi, githubApiResponse, null, 30 )

    this.state = {
      modalVisible: true
    }
  }

  render() {
    return (
      <Row>
        <Column>
          <Picker adapter={ this.test1Adapter } />
        </Column>
        <Column>
          <Modal isVisible={ this.state.modalVisible }>
            <Modal.Header>
              Hell
            </Modal.Header>
            <Modal.Body>
              Top
            </Modal.Body>
            <Modal.Footer>
              hehe
            </Modal.Footer>
          </Modal>
        </Column>
      </Row>
      )
  }
}

const select = (state) => state

export default connect( select )( KitchenSink3 )
