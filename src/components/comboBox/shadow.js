import React, { PropTypes } from 'react';

import Icon from '../icon';

import * as Styles from '../../styles';

const styles = Styles.comboBox;

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
      <div tabIndex={ data.opened ? '-1' : '0' } onFocus={ this.displayFocused } onClick={ this.displayFocused } ref="displayer" style={styles.shadow.display}>
        <span style={styles.shadow.displayLabel}>{ label }</span>
        <div tabIndex="-1" style={styles.shadow.displayIcon}>
          <Icon name="search" />
        </div>
      </div>
      );
  }
}