import React, { Component, PropTypes } from 'react'

import Match from '../components/Match'

class MatchesContainer extends Component {
  render () {
    const { matches, summonerId } = this.props

    if (!matches) {
      return null
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

function getMatchNodes (matches, summonerId) {
  return matches
    .map((match) => {
      return <Match key={match.matchId} summonerId={summonerId} {...match} />
    })
}

export default MatchesContainer
