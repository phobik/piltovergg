import React, { Component, PropTypes } from 'react'

import Summoner from '../components/Summoner'

class SummonerContainer extends Component {
  render () {
    const { summoner, league } = this.props

    if (!summoner || !league) {
      return null
    }

    const summonerId = summoner.id

    if (!league[summonerId]) {
      return (
        <div className='summoner-not-found'>No League Information Found for that Summoner</div>
      )
    }

    const leagueData = league[summonerId][0]

    return (
      <div className='summoner-container card'>
        <Summoner summonerData={summoner} leagueData={leagueData} />
      </div>
    )
  }
}

SummonerContainer.propTypes = {
  isFetching: PropTypes.bool,
  data: PropTypes.object,
  league: PropTypes.object
}

export default SummonerContainer
