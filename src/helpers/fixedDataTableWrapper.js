import React from 'react';

export default class FixedDataTableWrapper extends React.Component {
  constructor(props) {
    super(props)

    this.displayName = "FixedDataTableWrapper";

    this.state = {
      width: 0
    }
  }

  componentDidMount() {
    this.setState({
      width: this.refs.wrapper.offsetWidth
    })
  }
  render() {
    if (!this.state.width) {
      return <div style={ {  overflow: 'hidden',  width: '100%',  position: 'relative'} } ref="wrapper"></div>
    }

    const child = React.cloneElement(this.props.children, {
      width: this.state.width
    });

    return (
      <div style={ {  overflow: 'hidden',  width: '100%',  position: 'relative'} } ref="wrapper">
        { child }
      </div>
      );
  }
}