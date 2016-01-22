import React, { PropTypes } from 'react';

import { today, plug } from './system';

import styles from './styles';

// TODO: beautify, maybe change the anchor(<a />) element
export default class Day extends React.Component {
  static propTypes = {
    pick: PropTypes.func,
    value: PropTypes.object,
    day: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.displayName = 'DateTime(Day)';
    this.pick = this.pick.bind(this);

    this.dayHovered = this.dayHovered.bind(this);
    this.dayLeft = this.dayLeft.bind(this);

    this.state = {
      hovered: false
    }
  }

  pick() {
    this.props.onPick(this.props.day);
  }

  dayHovered() {
    this.setState({hovered: true});
  }

  dayLeft() {
    this.setState({hovered: false});
  }

  render() {
    const { day, value } = this.props;
    const { hovered } = this.state;

    let style = styles.day;

    if (day.format("YYYY-MM-DD") === value.format("YYYY-MM-DD")) {
      style = {...style, ...styles.selectedDay};
    }

    if(day.format("YYYY-MM-DD") === today.format("YYYY-MM-DD")) {
      style = {...style, ...styles.dayToday};
    }

    return (
      <a href="javascript:;"
         style={plug(hovered, style, styles.dayHovered)}
         onMouseEnter={this.dayHovered}
         onMouseLeave={this.dayLeft}
         onClick={this.pick}>
        { day.format("DD") }
      </a>
    );
  }
}