import React, { Component, PropTypes } from 'react'

import Match from '../components/Match'

class MatchesContainer extends Component {
  constructor (props) {
    super(props)

    this.state = { matches: [] }
  }

  async componentDidMount () {
    const { summonerId, region } = this.props

    const matches = await fetchSummonerMatches({ summonerId, region })

    this.setState({ matches })
  }

  render () {
    const { matches } = this.state
    const { summonerId } = this.props


    if (!matches || matches.length === 0) {
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
  summonerId: PropTypes.number
}

function getMatchNodes (matches, summonerId) {
  return matches.map((match) => {
    return <Match key={match.matchId} summonerId={summonerId} {...match} />
  })
}

async function fetchSummonerMatches ({ summonerId, region }) {
  const response = await window.fetch(`/api/summoners/${region}/${summonerId}/matches`)

  const data = await response.json()

  return data.matches
}

export default MatchesContainer
