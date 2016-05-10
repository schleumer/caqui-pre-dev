import React, { PropTypes } from 'react';

import Base from '../base';

export default class Component extends Base {
    constructor(props) {
        super(props);

        this.displayName = 'Form.Component';
    }

    walkThroughChildren(children) {
        return React.Children.map(children, this.relateWithForm.bind(this));
    }

    relateWithForm(child) {
        if (React.isValidElement(child)) {

            const props = {
                ...child.props
            };

            if (child.type.propTypes) {
                if (child.type.propTypes.relatedForm) {
                    props.relatedForm = this.props.name;
                    if (this.props.model) {
                        props.model = this.props.model;
                    }
                }
            }

            if (child.props.children && !child.type.__ignoreChildren) {
                if (Array.isArray(child.props.children)) {
                    return React.cloneElement(child, {
                        ...props,
                        children: this.walkThroughChildren(child.props.children)
                    });
                } else {
                    return React.cloneElement(child, {
                        ...props,
                        children: this.relateWithForm(child.props.children)
                    });
                }
            }

            return React.cloneElement(child, {
                ...props,
                relatedForm: this.props.name
            });
        }

        return child;
    }

    render() {
        return <div>Form Component</div>;
    }
}
