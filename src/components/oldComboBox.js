import React from 'react';
import R from 'ramda';

import Base from './base';

Object.defineProperty(Array.prototype, 'limitedFilter', {
  enumerable: false,
  writable: true,
  value: function(callback, limit, thisArg = null) {
    const aux = [];
    for (const i in this) {
      const x = this[i];
      const check = callback.apply(thisArg, [x]);
      if (check) {
        aux.push(x);
        if (aux.length == limit) {
          return aux;
        }
      }
    }

    return aux;
  }
});

class Result {
  constructor(data, total) {
    this.data = data;
    this.total = total;
    this.cursor = 0;
  }

  get length() {
    return this.data.length;
  }

  find(index) {
    return this.data[index];
  }

  get() {
    return this.data;
  }

  getStatus() {
    return `${this.data.length} de ${this.total}`;
  }

  indexOf(item) {
    return this.data.indexOf(item);
  }

  getPosition() {
    return this.cursor;
  }

  seek(position) {
    if (position < 0 || position >= this.data.length) {
      return this.cursor;
    }

    this.data.forEach(i => i.setFocused(false));

    this.cursor = position;

    this.find(this.cursor).setFocused(true);

    return this.find(this.cursor);
  }

  moveCursorUp() {
    this.seek(this.getPosition() - 1);
  }

  moveCursorDown() {
    this.seek(this.getPosition() + 1);
  }

  current() {
    return this.find(this.getPosition());
  }

}


class FilteredResult extends Result {
  getStatus() {
    return `Filtrado ${this.data.length} de ${this.total}`;
  }
}

class DataItem {
  constructor(item, settings) {
    this.data = item;
    this.settings = settings;

    if (this.settings.label.constructor == Function) {
      this.label = this.settings.label(item);
    } else {
      this.label = item[this.settings.label];
    }
  }


  getLabel() {
    return this.label;
  }

  getDisplay() {
    if (this.settings.display) {
      return this.settings.display(this.data);
    } else {
      return this.getLabel();
    }
  }

  getId() {
    return this.data[this.settings.id];
  }

  get() {
    return this.data;
  }

  isFocused() {
    return this.focused;
  }

  setFocused(value = true) {
    this.focused = value;
    return this;
  }

  contains(search) {
    return this.getId() == search
      || this.getLabel().toLowerCase().indexOf(search.toLowerCase()) > -1;
  }
}

class DataAdapter {
  constructor(data, settings = null) {
    this.updateListeners = [];
    this.currentUpdateListeners = [];
    this.settings = settings || {};
    this.cursor = 0;
    if (!this.settings.id) {
      this.settings.id = '$$id';
    }

    if (!this.settings.label) {
      this.settings.label = 'name';
    }

    this.cursor = 0;
    this.result = new Result([], 0);
    this.setData(data);
  }

  get() {
    //return this.data(item => item.)
  }

  set(id) {
    this.data.forEach(item => item.setFocused(false));
    for (const i in this.data) {
      const item = this.data[i];
      if (item.getId() == id) {
        this.seek(parseInt(i));
        this.currentUpdated(item);
      }
    }
  }

  seek(position) {
    if (position < 0 || position >= this.data.length) {
      return this;
    }

    this.data[this.cursor].setFocused(false);
    this.cursor = position;
    this.data[this.cursor].setFocused(true);
    return this;
  }

  seekResult(position) {
    this.result.seek(position);
    return this;
  }

  moveCursorUp() {
    this.result.moveCursorUp();
    this.updated();
  }

  moveCursorDown() {
    this.result.moveCursorDown();
    this.updated();
  }

  reset() {
    this.cursor = 0;
    return this;
  }

  getPosition() {
    return this.cursor;
  }

  current() {
    return this.result.current();
  }

  setCurrent(item) {
    //this.seek(this.data.indexOf(item));
    const onResult = this.result.indexOf(item);
    if (onResult > -1) {
      this.result.seek(onResult);
    }
  }

  filter(search) {
    const result = this.data.limitedFilter(item => item.setFocused(false).contains(search), 10);
    this.result = new FilteredResult(result, this.data.length);
    this.result.seek(0);
    return this.result;
  }

  onUpdate(fn) {
    this.updateListeners.push(fn);
  }

  updated() {
    this.updateListeners.forEach(fn => fn());
  }

  onCurrentUpdate(fn) {
    this.currentUpdateListeners.push(fn);
  }

  currentUpdated(item) {
    this.currentUpdateListeners.forEach(fn => fn(item));
  }

  setData(data) {
    let newData = null;
    if (!Array.isArray(data)) {
      newData = R.pipe(
        R.toPairs,
        R.map((item) => {
          if (item[1].constructor && item[1].constructor == Object) {
            return R.merge(item[1], {
              $$id: item[0]
            })
          } else {
            return {
              $$id: item[0],
              name: item[1]
            }
          }
        })
      )(data);
    } else {
      newData = data.map(item => {
        return R.merge({
          $$id: item[this.settings.id]
        }, item);
      });
    }

    this.data = newData.map(item => new DataItem(item, this.settings));

    // pre-result
    this.result = new Result(this.data.slice(0, 10), this.data.length);
    this.result.seek(0);

    return this.result;
  }

  getResult() {
    return this.result;
  }
}

class ComboBox extends Base {
  constructor(props) {
    super(props);

    this.state = {
      adapter: null,
      search: '',
      currentItem: null
    };

    this.adapterUpdated = this.adapterUpdated.bind(this);
    this.adapterCurrentUpdated = this.adapterCurrentUpdated.bind(this);
    this.onItemClick = this.onItemClick.bind(this);
    this.onInput = this.onInput.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.displayFocused = this.displayFocused.bind(this);
    this.displayFocused = this.displayFocused.bind(this);
  }

  componentWillMount() {
    const adapter = new DataAdapter(this.props.items, this.props.settings || {});

    adapter.onUpdate(this.adapterUpdated);
    adapter.onCurrentUpdate(this.adapterCurrentUpdated);

    this.setState({
      adapter: adapter
    });
  }

  componentWillReceiveProps(nextProps) {
    const adapter = new DataAdapter(nextProps.items, nextProps.settings || {});

    adapter.onUpdate(this.adapterUpdated);
    adapter.onCurrentUpdate(this.adapterCurrentUpdated);

    this.setState({
      adapter: adapter
    });
  }

  componentDidMount() {
    this.props.value && this.state.adapter.set(this.props.value);
  }

  componentDidUpdate() {
    const input = this.refs.search;
    if (input) {
      input.focus();
      if (input.setSelectionRange) {
        const offset = input.value.length * 2;
        input.setSelectionRange(offset, offset);
      }
    }
  }

  adapterCurrentUpdated(item) {
    this.changed(item, true);
  }

  componentWillUnmount() {
  }

  adapterUpdated() {
    this.forceUpdate();
  }

  onInput(evt) {
    this.state.adapter.filter(evt.target.value);
    this.setState({
      search: evt.target.value,
      isShown: true
    });
  }

  onFocus() {
    this.focus();
  }

  onBlur(evt, id, originalEvent) {
    const relatedTarget = evt.relatedTarget ||
      originalEvent.relatedTarget ||
      document.activeElement; // IE11

    const holderDom = this.refs.holder,
      a = relatedTarget,
      b = a && holderDom.contains(a);

    if (!b) {
      this.unfocus();
    } else {
      this.focus();
    }
  }

  onItemKeyDown(evt, a, b) {
    if (evt.which != 9 && evt.which != 13) {
      this.refs.search.focus();
      const ev = new KeyboardEvent("keydown", b);

      this.refs.search.dispatchEvent(ev, {
        bubbles: true
      });
    }
  }

  onItemClick(item) {
    return () => {
      this.state.adapter.setCurrent(item);
      this.unfocus();
      this.changed(item);
    }
  }

  onKeyDown(evt) {
    const item = this.state.adapter.current();

    switch (evt.which) {
      case 38:
        this.state.adapter.moveCursorUp();
        evt.preventDefault();
        break;
      case 40:
        this.state.adapter.moveCursorDown();
        evt.preventDefault();
        break;
      case 13:
        this.state.adapter.setCurrent(item);
        this.unfocus();
        this.changed(item);
        evt.preventDefault();
        break;
      case 27:
        this.unfocus();
        evt.preventDefault();
        break;
      default:
    }
  }

  reset() {
    this.setState({
      currentItem: null,
      search: null
    });
  }

  focus() {
    // remove a habilidade de foco do displayer
    // assim quando a pessoa der SHIFT-TAB ela não volta para o
    // displayer, que vai voltar para o input, etc.
    this.refs.displayer.tabIndex = -1;
    this.state.adapter.seekResult(0);
    this.setState({
      isShown: true
    });
  }

  unfocus() {
    this.refs.displayer.tabIndex = 0;
    this.setState({
      isShown: false
    });
  }

  changed(item, internal = false) {
    this.setState({
      currentItem: item,
      search: item.getLabel()
    });
    if (this.props.onChange && !internal) {
      this.props.onChange(item.get());
    }
  }

  displayFocused() {
    this.focus();
  }

  getValue() {
    return this.state.currentItem ? this.state.currentItem.get() : null;
  }

  render() {
    let popup = null;
    const classes = ['combobox'];

    if (this.props.className) {
      classes.push(this.props.className);
    }

    if (this.state.isShown) {
      let popupMessage = null;
      const filteredData = this.state.adapter.getResult();

      const items = filteredData.get().map((item) => {
        const classes = [];
        if (item.isFocused()) {
          classes.push('active');
        }
        return (
          <li key={ item.getId() } className={ classes.join(' ') }>
            <a href="javascript:;" tabIndex="-1" onClick={ this.onItemClick(item) }>
              { item.getDisplay() }
            </a>
          </li>
          );
      });

      if (items.length < 1) {
        popupMessage = <li className="dropdown-menu-text">Não há resultados</li>
      }

      popup = (
        <div style={ {  userSelect: 'none'} }>
          <ul className="combobox-dropdown-menu dropdown-menu" style={ {  display: 'block'} }>
            <li className="dropdown-menu-search">
              <input type="text" className="form-control" ref="search" value={ this.state.search } onChange={ this.onInput } onBlur={ this.onBlur } onFocus={ this.onFocus }
              onKeyDown={ this.onKeyDown } />
            </li>
            { items }
            { popupMessage }
            <li role="separator" className="divider"></li>
            <li className="dropdown-menu-text">
              { filteredData.getStatus() }
            </li>
          </ul>
        </div>
      );
    }

    const style = {
      position: 'relative',
      display: 'inline-block',
      verticalAlign: 'middle'
    };

    style = R.merge(this.props.style, style);

    return (
      <div style={ style } ref="holder" className={ classes.join(' ') }>
        <div className="combobox-display" tabIndex="0" onFocus={ this.displayFocused } onClick={ this.displayFocused } ref="displayer">
          { this.state.currentItem && this.state.currentItem.getDisplay() }
        </div>
        { popup }
      </div>
      );
  }
}

class ComboBoxSettings {
  setLabel(fn) {
    if (fn.constructor != Function) {
      throw new Error("Parametro deve ser uma função.");
    }
    this.label = fn;
    return this;
  }
  setDisplay(fn) {
    if (fn.constructor != Function) {
      throw new Error("Parametro deve ser uma função.");
    }
    this.display = fn;
    return this;
  }
}

ComboBox.Settings = ComboBoxSettings;


export default ComboBox;