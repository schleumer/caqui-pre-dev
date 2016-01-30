import React, { PropTypes } from 'react';

import styles from './styles';

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.displayName = "DateTime(Header)";

    this.prevMonth = this.prevMonth.bind(this);
    this.nextMonth = this.nextMonth.bind(this);
  }

  prevMonth(evt) {
    this.props.prevMonth(evt);
  }

  nextMonth(evt) {
    this.props.nextMonth(evt);
  }

  render() {
    const { current } = this.props;

    return (
      <div style={styles.headerHolder}>
        <table>
          <tbody>
            <tr>
              <td>
                <button type="button" 
                        onClick={this.prevMonth}
                        className="btn btn-xs btn-default"
                        style={{...styles.button, ...styles.headerButtonLeft}}>
                  &lt;
                </button>
              </td>
              <td style={styles.headerCurrentDayHolder}>
                <div tabIndex="0" style={styles.headerCurrentDay}>
                  { current.format("MMMM - YYYY") }
                </div>
              </td>
              <td>
                <button type="button"
                        onClick={this.nextMonth}
                        className="btn btn-xs btn-default"
                        style={{...styles.button, ...styles.headerButtonLeft}}>
                  &gt;
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}