import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as Caqui from '../../../lib/index'

const { Components: { Form, Button, Row, Column, Picker, Modal, TextInput, ModelDump }, Helpers: { createModel, PagedStore: { pagedRemoteStore } } } = Caqui

const githubApi = (/*query, limit, page*/) => 'example.json'
//`https://api.github.com/search/repositories?q=${query}&sort=stars&order=desc&page=${page}`;


const githubApiResponse = ({ data }) => ({
  items: data.items,
  total: data.total_count
})


class KitchenSink3 extends Component {
  constructor() {
    super()

    this.displayName = 'KitchenSink3'

    this.test1Adapter = pagedRemoteStore(githubApi, githubApiResponse, null, 30)

    this.state = {
      modalVisible: false
    }

    this.launchModal = this.launchModal.bind(this)
    this.closeModal = this.closeModal.bind(this)

    this.formModel = createModel({
      test_1: 'WE DO ACCEPT NESTED FORMS YEAH'
    })
  }

  launchModal() {
    this.setState({ modalVisible: true })
  }

  closeModal() {
    this.setState({ modalVisible: false })
  }

  render() {
    return (
      <Row style={ { paddingTop: 20 } }>
        <Column>
          <Picker name="test_tags" label="Teste de Tags" adapter={ this.test1Adapter }/>
        </Column>
        <Column>
          <TextInput
            name="test_1"
            label="Campo de Teste 1"/>
          <Modal
            isVisible={ this.state.modalVisible }
            title="Teste"
            onClose={ this.closeModal }
            withSecondary={ false }
            onPrimaryClick={ this.closeModal }>
            <Form model={ this.formModel } form={false} resetOnMount={true}>
              <TextInput
                name="test_1"
                label="Campo de Teste 1"/>
              <ModelDump />
            </Form>
          </Modal>
          <Button onClick={ this.launchModal }>Launch Modal</Button>
        </Column>
      </Row>
    )
  }
}

const select = (state) => state

export default connect(select)(KitchenSink3)
