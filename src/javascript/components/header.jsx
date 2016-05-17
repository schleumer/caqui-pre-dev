import React from 'react';

import Base from './base';

class Header extends Base {
    constructor(props) {
        super(props);
        this.displayName = 'Header';
    }

    render() {
        const size = this.props.size || 'default';
        let el;
        switch (size) {
            case Header.Primary:
                el = <h1>{ this.props.children }</h1>;
                break;
            case Header.Secondary:
            default:
                el = <h2>{ this.props.children }</h2>
        }
        return el;
    }
}

Header.Primary = "primary";
Header.Secondary = "secondary";

export default Header;