import React from 'react'

/**
 * TODO: PropTypes
 */
export default class Header extends React.Component {
  constructor(props) {
    super(props)

    this.displayName = 'DateTime(Header)'

    this.prevMonth = this.prevMonth.bind(this)
    this.nextMonth = this.nextMonth.bind(this)
  }

  prevMonth(evt) {
    this.props.prevMonth(evt)
  }

  nextMonth(evt) {
    this.props.nextMonth(evt)
  }

  render() {
    const { current } = this.props

    return (
      <div className="caqui-datetime-header-holder">
        <table>
          <tbody>
          <tr>
            <td>
              <button
                type="button"
                onClick={ this.prevMonth }
                className="caqui-button caqui-button-default caqui-button-xs">
                &lt;
              </button>
            </td>
            <td className="caqui-datetime-header-current-day-holder">
              <div
                tabIndex="0"
                className="caqui-datetime-header-current-day">
                { current.format('MMMM - YYYY') }
              </div>
            </td>
            <td>
              <button
                type="button"
                onClick={ this.nextMonth }
                className="caqui-button caqui-button-default caqui-button-xs">
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
