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
        this.refs.displayer.dispatch('focus');
    }

    render() {
        const {itemKey, itemLabel, store, xd} = this.props;

        const data = store.getState();

        let label = "Selecione uma opção";
        let value = null;

        if (data.selected) {
            value = itemLabel(data.selected);
        }

        //<span className="caqui-combobox-shadow">{ label }</span>
        return (
            <div style={{position: 'relative'}}>
                <FakeTextInput
                    tabIndex={ data.open ? '-1' : '0' }
                    onFocus={ this.displayFocused }
                    onClick={ this.displayFocused }
                    ref="displayer"
                    className="caqui-combobox-shadow-holder"
                    value={value}
                    placeholder={label}>
                </FakeTextInput>
                <div className="caqui-combobox-shadow-icon">
                    <Icon name="search" />
                </div>
            </div>
        );
    }
}
