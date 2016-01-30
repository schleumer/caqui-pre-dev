import React, { PropTypes } from 'react';

import Column from './column';
import SimpleCell from './simpleCell';
import Button from '../button';
import TextInput from '../textInput';
import Icon from '../icon';

import { Range } from 'immutable';

import Base from '../base';

class PaginationButton extends Base {
  constructor(props) {
    super(props);

    this.displayName = 'Table.PaginationButton';

    this.onClick = this.onClick.bind(this);
  }
  onClick(e) {
    if (!this.props.disabled) {
      if (this.props.onClick) {
        this.props.onClick();
      }
    }
    e.preventDefault();
  }
  render() {
    const {active, disabled, children} = this.props;

    const liClasses = [];

    if (disabled && !active) {
      liClasses.push('disabled');
    }

    if (active) {
      liClasses.push('active');
    }


    return (
      <li onClick={ this.onClick } className={ liClasses.join(' ') }>
        <a href="javascript:;">
          { children }
        </a>
      </li>
      );
  }
}


class Table extends Base {
  constructor(props) {
    super(props);
    this.displayName = 'Table';

    this.doTheFilter = this.doTheFilter.bind(this);

    // sorry, world
    this.unsafeUnmounted = false;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.adapter != nextProps.adapter) {
      nextProps.adapter.subscribe(() => {
        if (this.unsafeUnmounted) {
          return;
        }
        this.setState(nextProps.adapter.getState());
      });
      this.setState(nextProps.adapter.getState());
    }
  }

  componentWillUnmount() {
    this.unsafeUnmounted = true;
  }

  componentWillMount() {
    const {adapter} = this.props;

    adapter.subscribe(() => {
      if (this.unsafeUnmounted) {
        return;
      }
      this.setState(adapter.getState());
    });

    this.setState(adapter.getState());
  }

  doTheFilter(e) {
    this.props.adapter.filter(this.refs.search.getValue());

    e.preventDefault();
  }

  render() {
    const {adapter} = this.props;
    const {loading, items, totalOfPages, page, filter} = this.state;

    if (loading) {
      return (
        <div style={ {  width: '200px',  margin: '0 auto',  textAlign: 'center',  marginTop: '50px'} }>
          <div className="logo-loading" style={ {  marginBottom: '10px'} }>
            <div className="circle-1"></div>
            <div className="circle-2"></div>
          </div>
          <b>Carregando dados...</b>
        </div>
        );
    }

    const columns = React.Children.map(this.props.children, (el) => {
      return el.props;
    });

    const header = columns.map((props) => {
      return (<th key={ props.name }>
                { props.name }
              </th>)
      });



      const rows = items.map((item, index) => {
        const rowColumns = columns.map((column) => {
          let el = null;
          if (React.isValidElement(column.cell)) {
            el = React.cloneElement(column.cell, {
              row: item
            });
          } else {
            el = column.cell(item, index);
          }

          return (
            <td key={ column.name }>
              { el } </td>
            );
        });
        return <tr key={ item.id }>
                 { rowColumns }
               </tr>
        });

        let pageButtons = Range(1, totalOfPages + 1)
          .filter(item => {
            return ((item <= 3 && page < 3) || (item <= page + 1 && item >= page - 1)) || (item > (totalOfPages - 3));
          }).map((item) => {
          return (
            <PaginationButton active={ (item) == page } disabled={ (item) == page } key={ "page." + item } onClick={ adapter.goToPage(item) }>
              { item }
            </PaginationButton>
            );
        }).toJS();

        if (pageButtons.length == 6) {
          pageButtons = [
            ...pageButtons.slice(0, 3),
            <PaginationButton disabled={ true } key="...">...</PaginationButton>,
            ...pageButtons.slice(3, 6)
          ];
        }

        return (
          <div>
            <div className="row" style={ {  marginBottom: '10px'} }>
              <div className="col-xs-4 pull-right">
                <form onSubmit={ this.doTheFilter }>
                  <TextInput placeholder="Buscar..." ref="search" value={ filter } />
                  <div style={ {  position: 'absolute',  right: '15px',  top: '0px'} }>
                    <button className="btn btn-link" type="submit">
                      <Icon name="search" style={ {  width: '20px',  'height': '20px'} } />
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  { header }
                </tr>
              </thead>
              <tbody>
                { rows }
              </tbody>
              { /*<tfoot>
                                                  <tr>
                                                    <td>

                                                    </td>
                                                  </tr>
                                                </tfoot>*/ }
            </table>
            <div style={ {  textAlign: 'center',  'marginBottom': '20px'} }>
              <ul className="pagination">
                <PaginationButton disabled={ !adapter.hasFirst() } onClick={ adapter.firstPage }>
                  <Icon name="fast-rewind" />
                </PaginationButton>
                <PaginationButton disabled={ !adapter.hasPrev() } onClick={ adapter.prevPage }>
                  <Icon name="backward" />
                </PaginationButton>
                { pageButtons }
                <PaginationButton disabled={ !adapter.hasNext() } onClick={ adapter.nextPage }>
                  <Icon name="forward" />
                </PaginationButton>
                <PaginationButton disabled={ !adapter.hasLast() } onClick={ adapter.lastPage }>
                  <Icon name="fast-forward" />
                </PaginationButton>
              </ul>
            </div>
          </div>
          );
      }
    }

    Table.SimpleCell = SimpleCell;
    Table.Column = Column;

    export default Table;