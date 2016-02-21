import React, { PropTypes } from 'react';
import moment from 'moment';

import { buildCalendar } from './system';

import Header from './header';
import Footer from './footer';
import Day from './day';
import Row from '../row';
import Column from '../column';

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
      <th key={day} className="caqui-datetime-dropdown-weekday-title">
        <b>{day}</b>
      </th>
    );


    const days = (week) => {
      return week.map((day, weekDay) => {
        if(!day) {
          return <td key={weekDay} className="caqui-datetime-dropdown-day"></td>;
        }

        return (
          <td key={weekDay} className="caqui-datetime-dropdown-day">
            <Day day={day} value={value} onPick={this.pickADate} />
          </td>
        )
      });
    }

    const time = this.props.showTime ? (
      <Column size={Column.from(6, 6, 12, 12)}>
        <Footer current={current}
                    addHour={this.addHour}
                    subHour={this.subHour}
                    addMinute={this.addMinute}
                    subMinute={this.subMinute}
                    setHour={this.setHour}
                    setMinute={this.setMinute} />
      </Column>
    ) : null;

    const calendarRows = calendar.map((week, which) => {
      return (
        <tr key={which}>
          { days(week) }
        </tr>
      )
    })
    
    return (
      <div>
        <div className="caqui-datetime-dropdown-backdrop" />
        <div className="caqui-datetime-dropdown" tabIndex="0">
          <div className="caqui-datetime-dropdown-container">
            <Header current={current}
                    prevMonth={this.prevMonth}
                    nextMonth={this.nextMonth} />
            <Row>
              <Column size={Column.from(time ? 6 : 12, time ? 6 : 12,12,12)}>
                <table className="caqui-table caqui-table-bordered caqui-datetime-table">
                  <thead className="caqui-datetime-table-header">
                    <tr>
                      { weekDaysTitles }
                    </tr>
                  </thead>
                  <tbody className="caqui-datetime-table-body">
                    { calendarRows }
                  </tbody>
                </table>
              </Column>
              {time}
            </Row>
          </div>
          <a href="javascript:;" onClick={this.close} className="caqui-datetime-close">
            Fechar
          </a>
        </div>
      </div>
    );
  }
}