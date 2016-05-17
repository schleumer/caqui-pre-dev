import React, {Component} from 'react';

import {connect} from 'react-redux';

const select = function select(state) {
    return {
        loading: state.loading
    }
};

import Base from './base';

class Loading extends Base {
    constructor(props) {
        super(props);
        this.displayName = 'Loading';
    }

    render() {
        const {loading} = this.props;

        if (!loading.state)
            return null;

        return (
            <div className="caqui-loading">
                <div className="caqui-loading-holder">
                    <div className="caqui-logo-loading">
                        <div className="circle-1"></div>
                        <div className="circle-2"></div>
                    </div>
                    <div>Carregando...</div>
                    <div><b>{ loading.message }</b></div>
                    <div><b>{ loading.subMessage }</b></div>
                </div>
            </div>
        );
    }
}

export default connect(select)(Loading);
