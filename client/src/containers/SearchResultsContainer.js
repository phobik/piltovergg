import React, { Component } from 'react'
import { connect } from 'react-redux'

import MatchesContainer from './MatchesContainer'
import SummonerContainer from './SummonerContainer'

import {
  fetchSummonerData,
  fetchSummonerLeague,
  fetchSummonerRecentMatches,
  setRegion,
  setSummoner
} from '../actions'

class SearchResultsContainer extends Component {
  componentDidMount () {
    const { summoner, region } = this.props.routeParams
    const { dispatch } = this.props

    dispatch(setRegion(region))
    dispatch(setSummoner(summoner))

    let summonerId

    // This request chain might need to be cleaned up, right now the UI
    // will only update once we have complete the request chain for
    // SummonerData -> SummonerLeague -> Matches. It'd be nice to update
    // peacemeal instead so we don't have to display loading/a spinner
    // while the (potentially) long request for match data is pending.3
    dispatch(fetchSummonerData({ summoner, region }))
      .then(({ summonerData }) => {
        summonerId = summonerData.id
        return dispatch(fetchSummonerLeague({ summonerId: summonerId, region }))
      })
      .then(() => dispatch(fetchSummonerRecentMatches({ summonerId: summonerId, region })))
      .catch((error) => {
        // TODO: Handle error in request chain
        console.error(error)
      })
  }

  render () {
    return (
      <div className="search-results-container">
        <SummonerContainer/>
        <MatchesContainer />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    summoner: state.summoner,
    region: state.region
  }
}

export default connect(mapStateToProps)(SearchResultsContainer)
