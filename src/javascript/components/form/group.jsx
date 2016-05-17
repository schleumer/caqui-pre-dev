import React from 'react';
import cx from 'classnames';

import Base from '../base';

class Group extends Base {
    constructor(props) {
        super(props);
        this.displayName = 'Form.Group';
    }

    render() {
        const children = this.props.children;

        return (
            <div {...this.props} className={cx("caqui-form-group", this.props.className)}>
                { children }
            </div>
        );
    }
}

export default Group;
