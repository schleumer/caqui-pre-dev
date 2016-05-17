import React from 'react';
import ColumnBreakpoints from '../helpers/columnBreakpoints'
import ColumnOffsets from '../helpers/columnOffsets'

import Base from './base';

class Column extends Base {
    constructor(props) {
        super(props);
        this.displayName = 'Column';
    }

    render() {
        // TODO: better coding style
        const offsets = this.props.offset;

        let sizes = this.props.size;
        let classes = [];

        if (!sizes) {
            sizes = Column.from()
        }

        if (sizes && (sizes instanceof ColumnBreakpoints)) {
            classes = classes.concat(sizes.toArray());
        }

        if (offsets && (offsets instanceof ColumnOffsets)) {
            classes = classes.concat(offsets.toArray());
        }

        return (
            <div {...this.props} className={ classes.join(' ') } style={ {  ...this.props.style} }>
                { this.props.children }
            </div>
        );
    }
}


Column.large = size => new ColumnBreakpoints().large(size);
Column.medium = size => new ColumnBreakpoints().medium(size);
Column.small = size => new ColumnBreakpoints().small(size);
Column.extraSmall = size => new ColumnBreakpoints().extraSmall(size);
Column.from = (large = 12, medium = 12, small = 12, extraSmall = 12) => new ColumnBreakpoints(large, medium, small, extraSmall);
Column.offset = (large = 12, medium = 12, small = 12, extraSmall = 12) => new ColumnOffsets(large, medium, small, extraSmall);

export default Column;