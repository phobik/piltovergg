import React, { Component, PropTypes } from 'react'

class Stats extends Component {
  render () {
    const { queueType, wins } = this.props

    return (
      <li className='stats-card'>
        <strong>{queueType}</strong> - {wins}
      </li>
    )
  }
}

Stats.propTypes = {
  queueType: PropTypes.string,
  wins: PropTypes.number
}

export default Stats
