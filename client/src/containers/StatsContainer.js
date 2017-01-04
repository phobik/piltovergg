import React, { Component } from 'react'
import { connect } from 'react-redux'

import Stats from '../components/Stats'

class StatsContainer extends Component {
  render () {
    const { isFetching, data, } = this.props

    if (isFetching || !data) {
      return (
        <div className="a-spinner-eventually"></div>
      )
    }

    const statsSummaryNodes = marshallStatsSummary(data.summary)

    return (
      <div className="stats-container card">
        <h3>Wins per Game Mode</h3>
        <ul className="stats-list">
          {statsSummaryNodes}
        </ul>
      </div>
    )
  }
}

const statTypeMapping = {
  AramUnranked5x5: 'ARAM',
  CAP5x5: 'Dominion',
  CoopVsAI: 'Co-op vs AI',
  RankedFlexSR: 'Ranked Flex',
  RankedTeam3x3: 'Ranked 3v3',
  RankedTeam5x5: 'Ranked Teams',
  Unranked3x3: 'Unranked 3v3',
  Unranked: 'Unranked',
  RankedSolo5x5: 'Ranked Solo'
}

function marshallStatsSummary (summary) {
  return summary.playerStatSummaries.map((current, index) => {
    const props = {
      queueType: statTypeMapping[current.playerStatSummaryType],
      wins: current.wins,
      detailedStats: current.aggregatedStats
    }

    return <Stats {...props} key={index} />
  })
}

function mapStateToProps (state) {
  return {
    data: state.summonerStats,
    isFetching: state.isFetching
  }
}

export default connect(mapStateToProps)(StatsContainer)
