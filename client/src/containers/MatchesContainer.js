import React, { Component } from 'react'
import { connect } from 'react-redux'

import Match from '../components/Match'

class MatchesContainer extends Component {
  render () {
    if (this.props.isFetching || !this.props.matches) {
      return <div>Loading Recent Matches...</div>
    }

    return (
      <div class="matches-container">
        <h2>Recent Ranked Matches</h2>
        <div>
          {getMatchNodes(this.props.matches)}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(MatchesContainer)

function mapStateToProps (state) {
  return {
    matches: state.summonerMatches,
    isFetching: state.isFetching
  }
}

function getMatchNodes (matches) {
  return matches
    .map((match) => {
      return <Match key={match.matchId} {...match} />
    })
}
