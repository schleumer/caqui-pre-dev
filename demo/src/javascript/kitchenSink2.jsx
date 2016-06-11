import React, { Component } from 'react'

import { connect } from 'react-redux'

import * as Caqui from '../../../lib/index'

const { Components: { Row, Column, Table }, Helpers: { PagedStore: { pagedRemoteStore } } } = Caqui

const githubApi = (/*query, limit, page*/) => 'example.json'
  //`https://api.github.com/search/repositories?q=${query}&sort=stars&order=desc&page=${page}`;
  

const githubApiResponse = (res) => {
  const { data } = res

  return ({
    items: data.items,
    total: data.total_count
  })
}

class KitchenSink2 extends Component {
  constructor() {
    super()

    this.displayName = 'KitchenSink2'

    this.test1Adapter = pagedRemoteStore( githubApi, githubApiResponse, null, 30 )
  }

  render() {
    const extraCell = (row/*, index*/) => {
      return (
        <a href={ `/edit/${row.id}` }>Editar</a>
        )
    }

    return (
      <Row style={ { paddingTop: 20 } }>
        <Column>
          <Table adapter={ this.test1Adapter }>
            <Table.Column
                          name={ 'Nome' }
                          cell={ <Table.SimpleCell valueKey="name" /> } />
            <Table.Column
                          name={ 'Nome 2' }
                          cell={ <Table.SimpleCell valueKey="full_name" /> } />
            <Table.Column
                          name={ 'Controles' }
                          cell={ extraCell } />
          </Table>
        </Column>
      </Row>
    )
  }
}

const select = (state) => state

export default connect( select )( KitchenSink2 )
