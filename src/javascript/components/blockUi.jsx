import React, {Component} from 'react';

import {connect} from 'react-redux';

import Base from './base';

class BlockUI extends Base {
    constructor(props) {
        super(props);
        this.displayName = 'BlockUI';
    }

    render() {
        const {state, message, subMessage} = this.props;

        if (state) {
            return (
                <div>
                    <div className="caqui-blocked-ui">
                        {this.props.children}
                    </div>
                    <div className="caqui-block-ui">
                        <div className="caqui-block-ui-holder">
                            <div className="caqui-spinner">
                              <div className="caqui-bounce1"></div>
                              <div className="caqui-bounce2"></div>
                              <div className="caqui-bounce3"></div>
                            </div>
                            <div><b>{ message }</b></div>
                            <div><b>{ subMessage }</b></div>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default BlockUI;
