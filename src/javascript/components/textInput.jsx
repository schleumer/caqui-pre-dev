import React, {PropTypes} from 'react';
import cx from 'classnames';

import Form from './form';

import Icon from './icon';

import AlertBox from './alertBox';

import Base from './base';

import {createEvent, modelize} from '../helpers';

import * as system from '../system';

import * as Styles from '../styles';

const styles = Styles.textInput;
const m = system.m;

/// XXX: ?????????????
let objectId = 1;

class TextInput extends Base {
    static propTypes = {
        label: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.element
        ]),
        hint: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.element
        ]),
        placeholder: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.element
        ])
    };
    
    static defaultProps = {
        label: null,
        placeholder: null
    };

    static contextTypes = {
        caquiRelatedForm: React.PropTypes.string,
        caquiModel: React.PropTypes.any
    }

    constructor(props) {
        super(props);
        // just for control

        this.objectId = objectId++;

        this.displayName = 'TextInput';
        this.state = {
            value: null
        }

        this.onChange = this.onChange.bind(this);

        this.inputDebounce = null;
    }

    onChange(evt) {
        const newValue = evt.target.value;

        this.setValue(newValue);

        if (this.inputDebounce) {
            clearTimeout(this.inputDebounce);
        }

        if (this.props.onChange) {
            this.props.onChange(createEvent(evt, this, newValue));
        }
    }

    getValue() {
        return this.state.value;
    }

    getImmediateValue() {
        return this.refs.input.value;
    }

    setValue(value) {
        this.setState({
            value: value,
            focused: false
        });
    }

    makeId(props) {
        const {caquiRelatedForm, caquiModel} = this.context;

        const nextId = [caquiRelatedForm, caquiModel].filter(x => !!x);

        if (nextId.length) {
            this.id = nextId.join('.');
        } else {
            this.id = null;
        }
    }

    componentWillReceiveProps(props) {
        this.makeId(props);
    }

    componentWillMount() {
        this.state.value = this.props.value || null;
        this.makeId(this.props);
    }

    focus() {
        const {input} = this.refs;

        input.focus();

        input.selectionStart = input.selectionEnd = input.value.length;
    }

    render() {
        const props = {...this.props},
            {label, placeholder, className, hint} = props;

        // @todo helper
        const classNames = cx('caqui-form-control', className);

        let alertBox = null;
        let hintBox = null;

        if (this.id) {
            alertBox = <AlertBox silence={ true } namespace={ this.id }/>;
        }

        if (hint) {
            hintBox =
                (
                    <div className="caqui-form-control-hint">
                        <Icon name="help" className="hint-icon"/>
                        <div className="hint">{hint}</div>
                    </div>
                )
        }

        if (!props.hasOwnProperty("defaultValue")) {
            props.value = this.state.value || "";
        }

        return (
            <Form.Group>
                { label && <label style={styles.label}>
                    { label }
                </label> }
                <div className="caqui-form-control-holder">
                    <input
                        {...props}
                        type={props.type || "text"}
                        className={ classNames }
                        placeholder={ placeholder || label }
                        onChange={ this.onChange }
                        ref="input"/>
                    { hintBox }
                </div>
                <div className="caqui-form-control-footer">
                    { alertBox }
                </div>
            </Form.Group>
        );
    }
}

export default modelize(TextInput);
