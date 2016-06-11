import React, { PropTypes } from 'react'

export default class Footer extends React.Component {
  static propTypes = {
    addHour: PropTypes.func,
    subHour: PropTypes.func,
    addMinute: PropTypes.func,
    subMinute: PropTypes.func
  }

  constructor(props) {
    super(props)

    this.displayName = 'DateTime(Footer)'

    this.addHour = this.addHour.bind(this)
    this.subHour = this.subHour.bind(this)
    this.addMinute = this.addMinute.bind(this)
    this.subMinute = this.subMinute.bind(this)
    this.minuteChanged = this.minuteChanged.bind(this)
    this.hourChanged = this.hourChanged.bind(this)
  }

  addHour() {
    this.props.addHour()
  }

  subHour() {
    this.props.subHour()
  }

  addMinute() {
    this.props.addMinute()
  }

  subMinute() {
    this.props.subMinute()
  }

  minuteChanged() {
    const value = parseInt(this.refs.minute.value)

    if (value === undefined || value === null || isNaN(value)) {
      return
    }

    if (value < 0 || value > 59) {
      return
    }

    this.props.setMinute(value)
  }

  hourChanged() {
    const value = parseInt(this.refs.hour.value)

    if (value === undefined || value === null || isNaN(value)) {
      return
    }

    if (value < 0 || value > 23) {
      return
    }

    this.props.setHour(value)
  }


  render() {
    const { current } = this.props

    const { addHour, addMinute, subHour, subMinute } = this

    return (
      <div className="caqui-datetime-footer-holder">
        <table className="caqui-datetime-footer-table">
          <tbody>
          <tr>
            <td className="caqui-datetime-footer-add-hour">
              <button
                type="button"
                className="caqui-button caqui-button-xs caqui-button-default"
                onClick={ addHour }>
                +
              </button>
            </td>
            <td className="caqui-datetime-footer-add-minute">
              <button
                type="button"
                className="caqui-button caqui-button-xs caqui-button-default"
                onClick={ addMinute }>
                +
              </button>
            </td>
          </tr>
          <tr>
            <td className="caqui-datetime-footer-hour">
              <input
                type="text"
                value={ current.format( 'HH' ) }
                onChange={ this.hourChanged }
                className="form-control"
                ref="hour"/>
            </td>
            <td className="caqui-datetime-footer-minute">
              <input
                type="text"
                value={ current.format( 'mm' ) }
                onChange={ this.minuteChanged }
                className="form-control"
                ref="minute"/>
            </td>
          </tr>
          <tr>
            <td className="caqui-datetime-footer-sub-hour">
              <button
                type="button"
                className="caqui-button caqui-button-xs caqui-button-default"
                onClick={ subHour }>
                -
              </button>
            </td>
            <td className="caqui-datetime-footer-sub-minute">
              <button
                type="button"
                className="caqui-button caqui-button-xs caqui-button-default"
                onClick={ subMinute }>
                -
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    )
  }
}
