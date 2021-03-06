import React from 'react'
import Column from './column'
import SimpleCell from './simpleCell'
import Icon from '../icon'
import { Range } from 'immutable'
import Base from '../base'
import Search from './search'

/**
 * TODO: PropTypes
 */
class PaginationButton extends Base {
  static contextTypes = {
    router: React.PropTypes.any
  }

  constructor(props) {
    super(props)

    this.displayName = 'Table.PaginationButton'

    this.onClick = this.onClick.bind(this)
  }

  onClick(e) {
    if (!this.props.disabled) {
      if (this.props.onClick) {
        this.props.onClick()
      }
    }
    e.preventDefault()
  }

  render() {
    const { active, disabled, children } = this.props

    const liClasses = []

    if (disabled && !active) {
      liClasses.push('disabled')
    }

    if (active) {
      liClasses.push('active')
    }


    return (
      <li
        onClick={ this.onClick }
        className={ liClasses.join( ' ' ) }>
        <a href="javascript:">
          { children }
        </a>
      </li>
    )
  }
}

const PrintTable = ({ rows, header }) => {
  return (
    <table className="table table-bordered table-striped">
      <thead>
      <tr>
        { header }
      </tr>
      </thead>
      <tbody>
      { rows }
      </tbody>
    </table>
  )
}


class Table extends Base {
  static defaultProps = {
    withSearch: true
  }

  constructor(props) {
    super(props)
    this.displayName = 'Table'

    // sorry, world
    this.unsafeUnmounted = false

    this.hasFirst = this.hasFirst.bind(this)
    this.hasPrev = this.hasPrev.bind(this)
    this.hasNext = this.hasNext.bind(this)
    this.hasLast = this.hasLast.bind(this)
    this.firstPage = this.firstPage.bind(this)
    this.prevPage = this.prevPage.bind(this)
    this.nextPage = this.nextPage.bind(this)
    this.lastPage = this.lastPage.bind(this)
    this.goToPage = this.goToPage.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.adapter != nextProps.adapter) {
      nextProps.adapter.subscribe(() => {
        if (this.unsafeUnmounted) {
          return
        }
        this.setState(nextProps.adapter.getState())
      })
      this.setState(nextProps.adapter.getState())
    }
  }

  componentWillUnmount() {
    this.unsafeUnmounted = true
  }

  componentWillMount() {
    const { adapter } = this.props

    adapter.subscribe(() => {
      if (this.unsafeUnmounted) {
        return
      }

      this.setState(adapter.getState())
    })

    adapter.touch()

    this.setState(adapter.getState())
  }

  adapterWillChange(promise) {
    if (promise.then) {
      promise.then(() => {
        const state = this.props.adapter.getState()

        this.props.queryUpdated && this.props.queryUpdated({
          limit: state.itemsPerPage,
          page: state.page,
          ...(state.filter ? {
            query: state.filter
          } : {})
        })
      })
    }
  }

  hasFirst() {
    return this.props.adapter.hasFirst()
  }

  hasPrev() {
    return this.props.adapter.hasPrev()
  }

  hasNext() {
    return this.props.adapter.hasNext()
  }

  hasLast() {
    return this.props.adapter.hasLast()
  }

  firstPage() {
    this.adapterWillChange(this.props.adapter.firstPage())
  }

  prevPage() {
    this.adapterWillChange(this.props.adapter.prevPage())
  }

  nextPage() {
    this.adapterWillChange(this.props.adapter.nextPage())
  }

  lastPage() {
    this.adapterWillChange(this.props.adapter.lastPage())
  }

  goToPage(page) {
    return () => {
      this.adapterWillChange(this.props.adapter.goToPage(page))
    }
  }

  render() {
    //const { adapter } = this.props

    const { loading, items, totalOfPages, page } = this.state

    if (loading) {
      return (
        <div style={ { width: '200px', margin: '0 auto', textAlign: 'center', marginTop: '50px' } }>
          <div
            className="logo-loading"
            style={ { marginBottom: '10px' } }>
            <div className="circle-1"></div>
            <div className="circle-2"></div>
          </div>
          <b>Carregando dados...</b>
        </div>
      )
    }

    const columns = React.Children.map(this.props.children, (el) => {
      return el.props
    })

    const header = columns.map((props) => {
      return (
        <th key={ props.name }>
          { props.name }
        </th>
      )
    })


    const rows = items.map((item, index) => {
      const rowColumns = columns.map((column) => {
        let el = null
        if (React.isValidElement(column.cell)) {
          el = React.cloneElement(column.cell, {
            row: item
          })
        } else {
          el = column.cell(item, index)
        }

        return (
          <td key={ column.name }>
            { el }
          </td>
        )
      })
      return (
        <tr key={ item.id }>
          { rowColumns }
        </tr>
      )
    })

    let pageButtons = Range(1, totalOfPages + 1)
      .filter(item => {
        return ((item <= 3 && page < 3) || (item <= page + 1 && item >= page - 1)) || (item > (totalOfPages - 3))
      }).map((item) => {
        return (
          <PaginationButton
            active={ (item) == page }
            disabled={ (item) == page }
            key={ `page.${item}` }
            onClick={ this.goToPage( item ) }>
            { item }
          </PaginationButton>
        )
      }).toJS()

    if (pageButtons.length == 6) {
      pageButtons = [
        ... pageButtons.slice(0, 3),
        <PaginationButton
          disabled={ true }
          key="...">
          ...
        </PaginationButton>,
        ... pageButtons.slice(3, 6)
      ]
    }

    let search = null

    if (this.props.withSearch) {
      search = (
        <div
          className="row"
          style={ { marginBottom: '10px' } }>
          <div className="col-xs-4 pull-right">
            <Search adapter={ this.props.adapter }/>
          </div>
        </div>
      )
    }

    // onSubmit={ this.doTheFilter }

    if (rows.length) {
      return (
        <div>
          { search }
          <PrintTable
            rows={ rows }
            header={ header }/>
          <div style={ { textAlign: 'center', 'marginBottom': '20px' } }>
            <ul className="pagination">
              <PaginationButton
                disabled={ !this.hasFirst() }
                onClick={ this.firstPage }>
                <Icon name="rewind"/>
              </PaginationButton>
              <PaginationButton
                disabled={ !this.hasPrev() }
                onClick={ this.prevPage }>
                <Icon name="backward"/>
              </PaginationButton>
              { pageButtons }
              <PaginationButton
                disabled={ !this.hasNext() }
                onClick={ this.nextPage }>
                <Icon name="forward"/>
              </PaginationButton>
              <PaginationButton
                disabled={ !this.hasLast() }
                onClick={ this.lastPage }>
                <Icon name="fast-forward"/>
              </PaginationButton>
            </ul>
          </div>
        </div>
      )
    } else {
      return (
        <div className="caqui-row-fluid">
          { search }
          <div className="text-center">
            <b>Nada encontrado...</b>
          </div>
        </div>
      )
    }
  }
}

Table.SimpleCell = SimpleCell
Table.Column = Column
Table.Search = Search

export default Table
