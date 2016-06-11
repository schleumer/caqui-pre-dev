import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as Caqui from '../../../lib/index'

const { Components: { TextInput, Row, Column, ComboBox, ListOfItems, DateTime, FakeTextInput, Password }, Helpers: { PagedStore: { pagedRemoteStore } } } = Caqui

const githubApi = ( /*query, limit, page*/ ) => 'example.json'
//`https://api.github.com/search/repositories?q=${query}&sort=stars&order=desc&page=${page}`;


const githubApiResponse = ({ data }) => ({
  items: data.items,
  total: data.total_count
})

const phoneItemFilter = _ => ({
  phone: _
})

class KitchenSink extends Component {
  constructor() {
    super()

    this.displayName = 'KitchenSink'

    this.test4Adapter = pagedRemoteStore( githubApi, githubApiResponse )
    this.test5Adapter = pagedRemoteStore( githubApi, githubApiResponse )
    this.test6Adapter = pagedRemoteStore( githubApi, githubApiResponse )
    this.test7Adapter = pagedRemoteStore( githubApi, githubApiResponse )
    this.test9Adapter = pagedRemoteStore( githubApi, githubApiResponse )
  }

  render() {
    return (
      <div style={ { paddingTop: 20 } }>
        <Row>
          <Column size={ Column.from( 4 ) }>
            <TextInput
                       name="test_1"
                       label="Campo de Teste 1" />
          </Column>
          <Column size={ Column.from( 4 ) }>
            <TextInput
                       name="test_2"
                       label="Campo de Teste 2" />
          </Column>
          <Column size={ Column.from( 4 ) }>
            <TextInput
                       name="test_3"
                       label="Campo de Teste 3" />
          </Column>
        </Row>
        <Row>
          <Column size={ Column.from( 4 ) }>
            <FakeTextInput
                           name="test_1"
                           label="Campo fake de Teste 1" />
          </Column>
        </Row>
        <Row>
          <Column size={ Column.from( 3 ) }>
            <ComboBox
                      adapter={ this.test4Adapter }
                      name="test_4"
                      label="Campo de Teste 4" />
          </Column>
          <Column size={ Column.from( 3 ) }>
            <ComboBox
                      adapter={ this.test5Adapter }
                      name="test_5"
                      label="Campo de Teste 5" />
          </Column>
          <Column size={ Column.from( 3 ) }>
            <ComboBox
                      adapter={ this.test6Adapter }
                      name="test_6"
                      label="Campo de Teste 6" />
          </Column>
          <Column size={ Column.from( 3 ) }>
            <ComboBox
                      adapter={ this.test7Adapter }
                      name="test_7"
                      label="Campo de Teste 7" />
          </Column>
        </Row>
        <Row>
          <Column size={ Column.from( 4 ) }>
            <ListOfItems
                         name="test_8"
                         label="Campo de Teste 8">
              <TextInput />
            </ListOfItems>
          </Column>
          <Column size={ Column.from( 4 ) }>
            <ListOfItems
                         name="test_9"
                         itemKey={ _ => _.id }
                         itemLabel={ _ => _.name }
                         uniqueBy={ _ => _.name }
                         label="Campo de Teste 9">
              <ComboBox adapter={ this.test9Adapter } />
            </ListOfItems>
          </Column>
          <Column size={ Column.from( 4 ) }>
            <ListOfItems
                         name="test_12"
                         itemKey={ _ => _.unix() }
                         itemLabel={ _ => _.format( 'L LT' ) }
                         label="Campo de Teste 12">
              <DateTime displayFormat="L LT" />
            </ListOfItems>
          </Column>
        </Row>
        <Row>
          <Column size={ Column.from( 4 ) }>
            <ListOfItems
                         name="test_13"
                         before={ phoneItemFilter }
                         itemLabel={ _ => _.phone }
                         itemKey={ _ => _.phone }
                         label="Campo de Teste 13">
              <TextInput />
            </ListOfItems>
          </Column>
        </Row>
        <Row>
          <Column size={ Column.from( 4 ) }>
            <DateTime
                      name="test_10"
                      displayFormat="L LT"
                      label="Campo de Teste 10" />
          </Column>
          <Column size={ Column.from( 4 ) }>
            <DateTime
                      name="test_11"
                      displayFormat="L"
                      time={ false }
                      label="Campo de Teste 11" />
          </Column>
          <Column size={ Column.from( 4 ) }>
            <Password
                      name="test_14"
                      label="Campo de Teste 14" />
          </Column>
        </Row>
      </div>
    )
  }
}

const select = (state) => state

export default connect( select )( KitchenSink )
