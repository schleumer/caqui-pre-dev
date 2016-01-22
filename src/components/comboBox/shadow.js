import React, { PropTypes } from 'react';

import Icon from '../icon';

export default class Shadow extends React.Component {
  constructor(props) {
    super(props);

    this.displayFocused = this.displayFocused.bind(this);
  }

  displayFocused(evt, a, b, c) {
    this.refs.displayer.tabIndex = -1;

    const {store} = this.props;

    store.dispatch(store.actions.open());
  }

  unfocus() {
    this.refs.displayer.tabIndex = 0;
  }

  focus() {
    this.refs.displayer.focus("lel");
  }

  render() {
    const {itemKey, itemLabel, store, xd} = this.props;

    const data = store.getState();

    let label = "Selecione uma opção";

    if (data.selected) {
      label = itemLabel(data.selected);
    }

    return (
      <div className="combobox-display" tabIndex={ data.opened ? '-1' : '0' } onFocus={ this.displayFocused } onClick={ this.displayFocused } ref="displayer">
        { label }
        <div className="combobox-display-icon" tabIndex="-1">
          <Icon name="search" />
        </div>
      </div>
      );
  }
}