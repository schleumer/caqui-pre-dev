import React from 'react';

import Base from '../base';

class Column extends Base {
    constructor(props) {
        super(props);
        this.displayName = 'Table.Column';
    }

    render() {
        return <div>Column</div>;
    }
}

export default Column;
