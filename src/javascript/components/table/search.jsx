import React from 'react'
import TextInput from '../textInput'
import Icon from '../icon'
import Cage from '../cage'

/**
 * TODO: PropTypes
 */
class Search extends React.Component {
  constructor(props) {
    super(props)
    this.displayName = 'Search'

    this.doTheFilter = this.doTheFilter.bind(this)
    this.searchKeyDown = this.searchKeyDown.bind(this)
  }

  doTheFilter(e) {
    this.props.adapter.filter(this.refs.search.getValue())
    e.preventDefault()
  }

  searchKeyDown(e) {
    switch (e.which) {
      case 13:
        this.doTheFilter(e)
        return
    }
  }

  render() {
    const { adapter } = this.props
    const state = adapter.store.getState()

    const { filter } = state

    return (
      <div>
        <Cage>
          <TextInput
            placeholder="Buscar..."
            ref="search"
            value={ filter }
            onKeyDown={ this.searchKeyDown }/>
        </Cage>
        <div style={ { position: 'absolute', right: '15px', top: '0px' } }>
          <button
            className="btn btn-link"
            type="button"
            onClick={ this.doTheFilter }>
            <Icon
              name="magnify"
              style={ { width: '20px', 'height': '20px' } }/>
          </button>
        </div>
      </div>
    )
  }
}

export default Search
