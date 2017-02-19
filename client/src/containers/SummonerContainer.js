import React, { Component } from 'react'
import { connect } from 'react-redux'

import Summoner from '../components/Summoner'

class SummonerContainer extends Component {
  render () {
    const { isFetching, data, league } = this.props

    if (isFetching || !data || !league) {
      return (
        <div className="a-spinner-eventually"></div>
      )
    }

    const summonerId = data.id

    if (!league[summonerId]) {
      return (
        <div className="summoner-not-found">No League Information Found for that Summoner</div>
      )
    }

    const leagueData = league[summonerId][0]

    return (
      <div className="summoner-container card">
        <Summoner summonerData={data} leagueData={leagueData}  />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    data: state.summonerData,
    league: state.summonerLeague,
    isFetching: state.isFetching
  }
}

export default connect(mapStateToProps)(SummonerContainer)
