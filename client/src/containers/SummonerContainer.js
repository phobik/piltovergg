import React, { Component, PropTypes } from 'react'

import Summoner from '../components/Summoner'

class SummonerContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      summonerData: null,
      summonerLeague: null
    }
  }

  async componentDidMount () {
    const { summonerData, summonerId, region } = this.props

    const summonerLeague = await fetchSummonerLeague({ summonerId, region })

    this.setState({ summonerData, summonerLeague })
  }

  render () {
    const { summonerData, summonerLeague } = this.state

    if (!summonerData || !summonerLeague) {
      return null
    }

    const summonerId = summonerData.id

    if (!summonerLeague[summonerId]) {
      return (
        <div className='summoner-not-found'>No League Information Found for that Summoner</div>
      )
    }

    const leagueData = summonerLeague[summonerId][0]

    return (
      <div className='summoner-container card'>
        <Summoner summonerData={summonerData} leagueData={leagueData} />
      </div>
    )
  }
}

SummonerContainer.propTypes = {
  isFetching: PropTypes.bool,
  data: PropTypes.object,
  league: PropTypes.object
}

async function fetchSummonerLeague ({ summonerId, region }) {
  const response = await window.fetch(`/api/summoners/${region}/${summonerId}/league`)

  return await response.json()
}

export default SummonerContainer
