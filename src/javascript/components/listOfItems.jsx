import React, {PropTypes} from 'react';

import {modelize, createEvent} from '../helpers';

import Row from './row';
import Column from './column';
import Button from './button';
import Cage from './cage';

class ListOfItems extends React.Component {
    static propTypes = {
        caquiRelatedForm: PropTypes.string,
        uniqueBy: PropTypes.func,
        before: PropTypes.func
    };

    static defaultProps = {
        itemLabel: _ => _,
        itemKey: _ => btoa(JSON.stringify(_)),
        before: _ => _
    };

    // TODO: ???
    static __ignoreChildren = true;

    constructor(props) {
        super(props);
        this.displayName = 'ListOfItems';

        this.onAdd = this.onAdd.bind(this);

        this.state = {
            items: []
        };

        this.removeItem = this.removeItem.bind(this);
    }

    setValue(value) {
        this.setState({
            items: value || []
        });

        return value;
    }

    getValue() {
        return null;
    }

    onAdd() {
        const newItem = this.props.before(this.refs.input.getValue());

        let {uniqueBy, itemKey} = this.props;

        uniqueBy = uniqueBy || itemKey;

        const check = this.state.items.filter(item => uniqueBy(item) === uniqueBy(newItem)).length > 0;

        if (check) {
            return;
        }

        const items = [...this.state.items, newItem];

        this.setState({
            items
        });

        this.props.onChange && this.props.onChange(createEvent(null, this, items));

        this.refs.input.setValue(null);
    }

    removeItem(item) {
        return evt => {
            const oldItems = this.state.items;
            const index = oldItems.indexOf(item);

            const items = [...oldItems.filter(x => x != item)];

            this.setState({
                items
            });

            this.props.onChange && this.props.onChange(createEvent(null, this, items));

            return false;
        }
    }

    render() {
        const {input, itemLabel, itemKey, children, label} = this.props;

        const child = children || input;

        if (Array.isArray(child)) {
            throw new Error("ListOfItems children must be a single element");
        }

        let items = [];
        let info = null;

        if (this.state.items) {
            items = this.state.items.map(item => (
                <tr key={ itemKey(item) }>
                    <td style={ {  width: '100%'} }>
                        { itemLabel(item) }
                    </td>
                    <td><a href="javascript:;" onClick={ this.removeItem(item) }>remover</a></td>
                </tr>
            ));
        }

        if (!items.length) {
            items = (
                <tr className="list-of-items-empty">
                    <td>Lista vázia</td>
                </tr>
            );
        }

        return (
            <div>
                <Row>
                    <Column>
                        { label && <label>
                            { label }
                        </label> }
                    </Column>
                </Row>
                <Row>
                    <Column size={ Column.from(8, 8, 8, 8) }>
                        <Cage>
                            { React.cloneElement(child, {
                                ref: 'input'
                            }) }
                        </Cage>
                    </Column>
                    <Column size={ Column.from(4, 4, 4, 4) }>
                        <Button onClick={ this.onAdd } block={true}>Adicionar</Button>
                    </Column>
                </Row>
                <Row>
                    <Column size={ Column.from(12) }>
                        <table className="table table-bordered">
                            <tbody>
                            { items }
                            { info }
                            </tbody>
                        </table>
                    </Column>
                </Row>
            </div>
        );
    }
}

export default modelize(ListOfItems);
