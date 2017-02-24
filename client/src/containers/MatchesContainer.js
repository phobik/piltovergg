import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Match from '../components/Match'

class MatchesContainer extends Component {
  render () {
    const { isFetching, matches, summonerId } = this.props

    if (isFetching || !matches) {
      return <div>Loading Recent Matches...</div>
    }

    return (
      <div className='matches-container'>
        <h2>Recent Ranked Matches</h2>
        <div>
          {getMatchNodes(matches, summonerId)}
        </div>
      </div>
    )
  }
}

MatchesContainer.propTypes = {
  isFetching: PropTypes.bool,
  matches: PropTypes.array,
  summonerId: PropTypes.number
}

function mapStateToProps (state) {
  return {
    matches: state.summonerMatches,
    isFetching: state.isFetching,
    summonerId: state.summonerData ? state.summonerData.id : 0
  }
}

function getMatchNodes (matches, summonerId) {
  return matches
    .map((match) => {
      return <Match key={match.matchId} summonerId={summonerId} {...match} />
    })
}

export default connect(mapStateToProps)(MatchesContainer)
