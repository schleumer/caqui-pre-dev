import React, { PropTypes } from 'react';
import cx from 'classnames';

import { createEvent, modelize } from '../../helpers';

import Form from '../form';

import storeBuilder from './storeBuilder';
import Shadow from './shadow';
import Dropdown from './dropDown';

class ComboBox extends React.Component {
    static propTypes = {
        relatedForm: PropTypes.string
    };
    static defaultProps = {
        itemKey: _ => _.id,
        itemLabel: _ => _.name
    };
    constructor(props) {
        super(props);
        this.displayName = 'ComboBox';

        // sorry, world.
        this.unsafeUnmounted = false;

        this.store = storeBuilder(props.adapter);

        this.onDropDownBlur = this.onDropDownBlur.bind(this);
        this.onDropDownChange = this.onDropDownChange.bind(this);
    }

    componentWillMount() {
        const store = this.store;
        store.subscribe(() => {
            if (this.unsafeUnmounted) {
                return;
            }
            this.setState(store.getState());
        });
        store.touch();

        this.setState(store.getState());
    }

    getValue() {
        return this.state.selected;
    }

    setValue(value) {
        console.trace(value);

        const store = this.store;
        store.dispatch(store.actions.select(value));
        return value;
    }

    onDropDownChange(item) {
        const store = this.store;

        store.dispatch(store.actions.select(item));

        this.props.onChange && this.props.onChange(createEvent(null, this, item));
        //this.refs.shadow.focus();
        this.store.dispatch(store.actions.close());
    }

    onDropDownBlur(evt, id, originalEvent) {
        // SORRY, WORLD :(
        // https://github.com/facebook/react/issues/2011
        setTimeout(() => {
            const {actions} = this.store;

            const relatedTarget = evt.relatedTarget ||
                                  originalEvent.relatedTarget ||
                                  document.activeElement;

            const holderDom = this.refs.holder,
                  a = relatedTarget,
                  b = a && holderDom.contains(a);

            if (!b) {
                this.store.dispatch(actions.close());
                //this.refs.shadow.unfocus();
            } else {
                this.store.dispatch(actions.open());
            }
        }, 1);
    }

    render() {
        const data = this.state;

        const {itemKey, itemLabel, className} = this.props;

        const classNames = cx('caqui-combobox', 'caqui-combobox-holder', className);

        let dropdown = null;
        let label = null;
        let shadow = null;

        if (this.props.label) {
            label = <label>{ this.props.label }</label>;
        }

        const childProps = {
            itemKey,
            itemLabel,
            store: this.store
        };

        if (data.open) {
            dropdown = <Dropdown {...childProps} onBlur={ this.onDropDownBlur } onChange={ this.onDropDownChange } />;
        }

        return (
            <Form.Group>
                { label }
                <div className={ classNames } ref="holder">
                    <Shadow {...childProps} ref="shadow" />
                    <div>
                        { dropdown }
                    </div>
                </div>
            </Form.Group>
        );
    }
}

ComboBox.__ignoreChildren = true;

export default modelize(ComboBox);
