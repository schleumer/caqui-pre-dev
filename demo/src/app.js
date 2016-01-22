import React from 'react';
import ReactDOM from 'react-dom';

class Hello extends React.Component {
  render() {
    return (<b>Hello World</b>);
  }
}


ReactDOM.render(
  <Hello />,
  document.getElementById('app')
);