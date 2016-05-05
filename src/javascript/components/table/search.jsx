import React from 'react';

import Button from '../button';
import TextInput from '../textInput';
import Icon from '../icon';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Search';

        this.doTheFilter = this.doTheFilter.bind(this);
    }

    doTheFilter(e) {
        this.props.adapter.filter(this.refs.search.getValue());
        e.preventDefault();
    }

    render() {
        const {adapter} = this.props;
        const state = adapter.store.getState();

        const {filter} = state;
        
        return (
            <div>
                <TextInput placeholder="Buscar..." ref="search" value={ filter }/>
                <div style={ {  position: 'absolute',  right: '15px',  top: '0px'} }>
                    <button className="btn btn-link" type="button" onClick={ this.doTheFilter }>
                        <Icon name="magnify" style={ {  width: '20px',  'height': '20px'} }/>
                    </button>
                </div>
            </div>
        );
    }
}

export default Search;
