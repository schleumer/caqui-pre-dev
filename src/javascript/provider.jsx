import React from 'react';

class Provider extends React.Component {
    static childContextTypes = {};

    constructor(props) {
        super(props);
    }

    getChildContext() {
        return {};
    }

    render() {
        return this.props.children;
    }
}

export default Provider;