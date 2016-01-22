import React, { PropTypes } from 'react';
import moment from 'moment';

import { buildCalendar } from './system';

import Header from './header';
import Footer from './footer';
import Day from './day';

import styles from './styles';

export default class DropDown extends React.Component {
  static propTypes = {
    onDatePicked: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.displayName = 'DateTime(DropDown)';

    this.prevMonth = this.prevMonth.bind(this);
    this.nextMonth = this.nextMonth.bind(this);
    this.pickADate = this.pickADate.bind(this);

    this.addHour = this.addHour.bind(this);
    this.subHour = this.subHour.bind(this);
    this.addMinute = this.addMinute.bind(this);
    this.subMinute = this.subMinute.bind(this);

    this.setMinute = this.setMinute.bind(this);
    this.setHour = this.setHour.bind(this);

    this.close = this.close.bind(this);
  }

  prevMonth() {
    const { dispatch, actions } = this.props.store;

    dispatch(actions.prevMonth());
  }

  nextMonth() {
    const { dispatch, actions } = this.props.store;

    dispatch(actions.nextMonth());
  }

  addMinute() {
    const { dispatch, actions } = this.props.store;

    dispatch(actions.addMinute()); 

    this.timeChanged();
  }

  subMinute() {
    const { dispatch, actions } = this.props.store;

    dispatch(actions.subMinute());

    this.timeChanged();
  }

  addHour() {
    const { dispatch, actions } = this.props.store;

    dispatch(actions.addHour());

    this.timeChanged();
  }

  subHour() {
    const { dispatch, actions } = this.props.store;

    dispatch(actions.subHour());

    this.timeChanged();
  }

  timeChanged() {
    const { getState } = this.props.store;

    this.props.onTimeChanged && this.props.onTimeChanged(getState().value);
  }

  setMinute(minute) {
    const { dispatch, actions } = this.props.store;

    dispatch(actions.setMinute(minute));

    this.timeChanged();
  }

  setHour(hour) {
    const { dispatch, actions } = this.props.store;

    dispatch(actions.setHour(hour));

    this.timeChanged();
  }

  pickADate(evt) {
    this.props.onDatePicked(evt);
  }

  close() {
    const { dispatch, actions } = this.props.store;

    dispatch(actions.close());
  }

  // TODO: shrink, split, etc.
  render() {
    const state = this.props.store.getState();
    const { current } = state;

    const value = state.value || current.clone();
    
    if(!this.props.visible) {
      return null;
    }

    const calendar = buildCalendar(current);

    // TODO: remove?
    const weekDaysTitles = moment.weekdaysShort().map(day =>
      <td key={day} style={styles.weekDayTitle}>
        <b>{day}</b>
      </td>
    );


    const days = (week) => {
      return week.map((day, weekDay) => {
        if(!day) {
          return <td key={weekDay} style={styles.dayCell}></td>;
        }

        return (
          <td key={weekDay} style={styles.dayCell}>
            <Day day={day} value={value} onPick={this.pickADate} />
          </td>
        )
      });
    }

    const time = this.props.showTime ? (
      <Footer current={current}
                  addHour={this.addHour}
                  subHour={this.subHour}
                  addMinute={this.addMinute}
                  subMinute={this.subMinute}
                  setHour={this.setHour}
                  setMinute={this.setMinute} />
    ) : null;

    const calendarRows = calendar.map((week, which) => {
      return (
        <tr key={which}>
          { days(week) }
        </tr>
      )
    })
    
    return (
      <div style={styles.dropdownRoot} className="dropdown-menu" tabIndex="0">
        <div style={{padding: '5px'}}>
          <Header current={current}
                  prevMonth={this.prevMonth}
                  nextMonth={this.nextMonth} />
          <div>
            <table style={styles.daysTable} className="table table-bordered">
              <thead style={styles.daysTableHeader}>
                <tr>
                  { weekDaysTitles }
                </tr>
              </thead>
              <tbody style={styles.daysTableBody}>
                { calendarRows }
              </tbody>
            </table>
          </div>

          {time}
        </div>
        <a href="javascript:;" onClick={this.close} style={{textAlign: 'center', backgroundColor: 'rgba(245, 245, 245, .8)', position: 'absolute', bottom: '0px', left: '0px', right: '0px', padding: '4px'}}>
          Fechar
        </a>
      </div>
    );
  }
}