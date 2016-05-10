import React, { PropTypes } from 'react';
import cx from 'classnames';

import TextInput from '../textInput';

export default class Dropdown extends React.Component {
    constructor(props) {
        super(props);

        this.displayName = 'Dropdown';

        this.onInput = this.onInput.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.inputDebounce = null;
    }

    onInput(event, data) {
        const {store} = this.props;

        if (this.inputDebounce) {
            clearTimeout(this.inputDebounce);
        }

        this.inputDebounce = setTimeout(() => {
            store.dispatch(store.actions.filter(data));
        }, 300);
    }

    onBlur(evt, id, originalEvent) {
        this.props.onBlur && this.props.onBlur(evt, id, originalEvent);
    }

    onFocus() {
    }

    onKeyDown(evt) {
        const {store} = this.props;
        const state = store.getState();

        switch (evt.which) {
            case 38: // UP
                store.dispatch(store.actions.up());
                evt.preventDefault();
                break;
            case 40: // DOWN
                store.dispatch(store.actions.down());
                evt.preventDefault();
                break;
            case 13: // ENTER
                const current = state.items[state.position];

                if (current) {
                    this.select(current)(evt);
                } else {
                    store.dispatch(store.actions.close());
                }

                break;
            case 27: // ESC
                store.dispatch(store.actions.close());
                evt.preventDefault();
                break;
            default:
        }
    }

    componentDidMount() {
        const {search} = this.refs;
        search.dispatch("focus");
        //search.selectionStart = search.selectionEnd = search.value.length;
    }

    select(item) {
        return evt => {
            const {store, onChange} = this.props;
            onChange && onChange(item);

            evt.preventDefault();
        }
    }

    render() {
        const {itemKey, itemLabel, store, className} = this.props;

        const data = store.getState();

        let popupMessage = null;

        const items = data.items.map((e, index) => {
            const classNames = cx("caqui-combobox-dropdown-list-item", {
                active: index == data.position,
                selected: data.selected && itemKey(data.selected) === itemKey(e)
            });

            return (
                <li key={ itemKey(e) } className={classNames}>
                    <a href="javascript:;" onClick={ this.select(e) } tabIndex="-1" className="caqui-combobox-dropdown-list-item-anchor">
                        { itemLabel(e) }
                    </a>
                </li>
            )
        }
        );

        if (items.length < 1) {
            popupMessage = <li className="caqui-combobox-dropdown-list-text">Não há resultados</li>
        }

        return (
            <div className={cx("caqui-combobox-dropdown-holder", className)} ref="holder">
                <div className="caqui-combobox-dropdown-backdrop">
                    <div className="caqui-combobox-dropdown">
                        <ul className="caqui-combobox-dropdown-list">
                            <li className="caqui-combobox-dropdown-list-search">
                                <TextInput
                                    className="caqui-combobox-dropdown-search-input"
                                    ref="search"
                                    name="combobox-dropdown-search"
                                    defaultValue={ data.filter }
                                    onChange={ this.onInput }
                                    onBlur={ this.onBlur }
                                    onFocus={ this.onFocus }
                                    onKeyDown={ this.onKeyDown } />
                            </li>
                            { items }
                            { popupMessage }
                            <li role="separator" className="caqui-combobox-dropdown-list-separator"></li>
                            <li className="caqui-combobox-dropdown-list-text">
                                { data.status }
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

}
