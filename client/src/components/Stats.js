import React, { Component } from 'react'

class Stats extends Component {
  render () {
    const { queueType, wins } = this.props

    return (
      <li className="stats-card">
        <strong>{queueType}</strong> - {wins}
      </li>
    )
  }
}

export default Stats
