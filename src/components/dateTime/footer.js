import React, { PropTypes } from 'react';

import styles from './styles';

const buttonStyle = {...styles.button, ...{width: '40px'}};

export default class Header extends React.Component {
  static propTypes = {
    addHour: PropTypes.func,
    subHour: PropTypes.func,
    addMinute: PropTypes.func,
    subMinute: PropTypes.func
  };
  constructor(props) {
    super(props);

    this.displayName = "DateTime(Header)";

    this.addHour = this.addHour.bind(this);
    this.subHour = this.subHour.bind(this);
    this.addMinute = this.addMinute.bind(this);
    this.subMinute = this.subMinute.bind(this);
    this.minuteChanged = this.minuteChanged.bind(this);
    this.hourChanged = this.hourChanged.bind(this);
  }

  addHour() {
    this.props.addHour();
  }
  subHour() {
    this.props.subHour();
  }
  addMinute() {
    this.props.addMinute();
  }
  subMinute() {
    this.props.subMinute();
  }

  minuteChanged(evt) {
    const value = parseInt(this.refs.minute.value);

    if(value === undefined || value === null || isNaN(value)) {
      evt.
      return;
    }

    if(value < 0 || value > 59) {
      return;
    }

    this.props.setMinute(value);
  }

  hourChanged() {
    const value = parseInt(this.refs.hour.value);

    if(value === undefined || value === null || isNaN(value)) {
      return;
    }

    if(value < 0 || value > 23) {
      return;
    }

    this.props.setHour(value);
  }


  render() {
    const { current } = this.props;

    const { addHour, addMinute, subHour, subMinute } = this;

    return (
      <div style={styles.headerHolder}>
        <table style={{margin: '0 auto'}}>
          <tbody>
            <tr>
              <td style={{width: '50px', textAlign: 'center', paddingRight: '5px'}}>
                <button type="button" style={buttonStyle} className="btn btn-xs btn-default" onClick={addHour}>+</button>
              </td>
              <td style={{width: '50px', textAlign: 'center', paddingRight: '5px'}}>
                <button type="button" style={buttonStyle} className="btn btn-xs btn-default" onClick={addMinute}>+</button>
              </td>
            </tr>
            <tr>
              <td style={{width: '50px', textAlign: 'center', fontSize: '18px', fontWeight: 'bold', paddingTop: '5px', paddingBottom: '5px', paddingRight: '5px'}}>
                <input type="text" value={ current.format('HH') } onChange={this.hourChanged} className="form-control" style={{ width: '35px', margin: '0 auto',  textAlign: 'center' }} ref="hour" />
              </td>
              <td style={{width: '50px', textAlign: 'center', fontSize: '18px', fontWeight: 'bold', paddingTop: '5px', paddingBottom: '5px', paddingRight: '5px'}}>
                <input type="text" value={ current.format('mm') } onChange={this.minuteChanged} className="form-control" style={{ width: '35px', margin: '0 auto', textAlign: 'center' }} ref="minute" />
              </td>
            </tr>
            <tr>
              <td style={{width: '50px', textAlign: 'center', paddingRight: '5px'}}>
                <button type="button" style={buttonStyle} className="btn btn-xs btn-default" onClick={subHour}>-</button>
              </td>
              <td style={{width: '50px', textAlign: 'center', paddingRight: '5px'}}>
                <button type="button" style={buttonStyle} className="btn btn-xs btn-default" onClick={subMinute}>-</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}