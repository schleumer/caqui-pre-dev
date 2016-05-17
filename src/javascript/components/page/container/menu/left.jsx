import React from 'react';

import Base from '../../../base';

class Left extends Base {
    constructor(props) {
        super(props);
        this.displayName = 'Left';
    }

    render() {
        return (
            <div className="caqui-page-left pull-left">
                { this.props.children }
            </div>
        );
    }
}

export default Left;
