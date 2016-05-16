import React from 'react';

/**
 * Isolate component from parent's model context.
 */
class Cage extends React.Component {
    static childContextTypes = {
        caquiRelatedForm: React.PropTypes.string,
        caquiModel: React.PropTypes.any
    }

    constructor(props) {
        super(props);
        this.displayName = 'Cage';
    }

    getChildContext() {
      return {
        caquiRelatedForm: null,
        caquiModel: null
      }
    }

    render() {
        return this.props.children;
    }
}

export default Cage;
