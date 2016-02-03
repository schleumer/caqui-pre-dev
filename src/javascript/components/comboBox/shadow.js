import React, { PropTypes } from 'react';

import Icon from '../icon';
import FakeTextInput from '../fakeTextInput';

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
    this.refs.displayer.focus();
  }

  render() {
    const {itemKey, itemLabel, store, xd} = this.props;

    const data = store.getState();

    let label = "Selecione uma opção";

    if (data.selected) {
      label = itemLabel(data.selected);
    }

    return (
      <FakeTextInput
        tabIndex={ data.open ? '-1' : '0' }
        onFocus={ this.displayFocused }
        onClick={ this.displayFocused }
        ref="displayer"
        className="caqui-combobox-shadow-holder">
        <span className="caqui-combobox-shadow">{ label }</span>
        <div className="caqui-combobox-shadow-icon">
          <Icon name="search" />
        </div>
      </FakeTextInput>
      );
  }
}