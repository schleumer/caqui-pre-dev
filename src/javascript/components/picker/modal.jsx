import React, { PropTypes } from 'react'
import CaquiModal from '../modal'
import CheckBox from '../checkBox'
import TextInput from '../textInput'
import Button from '../button'
import Cage from '../cage'
import Icon from '../icon'
import { Range } from 'immutable'

class Item extends React.Component {
  static propTypes = {
    isVisible: PropTypes.bool,
    onUnchecked: PropTypes.func.isRequired,
    onChecked: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)

    this.onChange = this.onChange.bind(this)
  }

  onChange(event) {
    if (event.target.checked) {
      this.props.adapter.check(this.props.item)
      this.props.onChecked(this.props.item)
    } else {
      this.props.adapter.uncheck(this.props.item)
      this.props.onUnchecked(this.props.item)
    }
  }

  render() {
    const { item, indexedItems, itemLabel } = this.props

    const id = `checkbox-${this.oid}-${item.key}`

    return (
      <Cage>
        <CheckBox
          id={id}
          type="checkbox"
          className="caqui-checkbox"
          onChange={this.onChange}
          checked={indexedItems.indexOf(item.key) > -1}>
          {itemLabel(item.value)}
        </CheckBox>
      </Cage>
    )
  }
}


class PaginationButton extends React.Component {
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


class Modal extends React.Component {
  static propTypes = {
    isVisible: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    itemLabel: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.displayName = 'Picker(Modal)'

    this.onItemChecked = this.onItemChecked.bind(this)
    this.onItemUnchecked = this.onItemUnchecked.bind(this)

    this.hasFirst = this.hasFirst.bind(this)
    this.hasPrev = this.hasPrev.bind(this)
    this.hasNext = this.hasNext.bind(this)
    this.hasLast = this.hasLast.bind(this)
    this.firstPage = this.firstPage.bind(this)
    this.prevPage = this.prevPage.bind(this)
    this.nextPage = this.nextPage.bind(this)
    this.lastPage = this.lastPage.bind(this)
    this.goToPage = this.goToPage.bind(this)
    this.close = this.close.bind(this)
    this.search = this.search.bind(this)
    this.searchKeyDown = this.searchKeyDown.bind(this)
    this.searchDebounce = null
  }

  searchKeyDown(event) {
    switch(event.which) {
      case 27:
        this.props.adapter.hideModal()
        break
    }
  }

  search(event) {
    const query = event.target.value

    if (this.searchDebounce) {
      clearTimeout(this.searchDebounce)
    }

    this.searchDebounce = setTimeout(() => {
      this.props.adapter.filter(query)
    }, 300)
  }

  onItemChecked() {
    this.props.onChange()
  }

  onItemUnchecked() {
    this.props.onChange()
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

  close() {
    this.props.adapter.hideModal()
  }

  render() {
    const { loading, totalOfPages, page } = this.props.adapter.getState()

    const items = this.props.items.map(item => {
      return (
        <Item
          key={this.props.itemKey(item.value)}
          adapter={this.props.adapter}
          item={item}
          itemLabel={this.props.itemLabel}
          checkedItems={this.props.checkedItems}
          indexedItems={this.props.indexedItems}
          onChecked={this.onItemChecked}
          onUnchecked={this.onItemUnchecked}/>
      )
    })

    let pagination = null

    if (totalOfPages > 1) {
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

      pagination = (
        <div>
          <div style={ { textAlign: 'center' } }>
            <ul className="pagination" style={ { padding: '5px', margin: 0 } }>
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
    }

    return (
      <div>
        <CaquiModal
          isVisible={this.props.isVisible}
          onClose={this.props.onClose}>
          <CaquiModal.Body>
            <div>
              <Cage>
                <TextInput
                  onKeyDown={this.searchKeyDown}
                  onChange={this.search}
                  placeholder="Buscar..."
                  autoFocus />
              </Cage>
            </div>
            <div>
              { items }
            </div>
            <div>
              { pagination }
            </div>
          </CaquiModal.Body>
          <CaquiModal.Footer>
            <Button style={{marginRight: 5}} onClick={this.close}>Cancelar</Button>
            <Button type={Button.Primary} onClick={this.props.onConfirm}>Salvar</Button>
          </CaquiModal.Footer>
        </CaquiModal>
      </div>
    )
  }
}

export default Modal
