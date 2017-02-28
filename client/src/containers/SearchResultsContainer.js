import React, { Component, PropTypes } from 'react'
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
  async componentDidMount () {
    const { summoner, region } = this.props.routeParams
    const { dispatch } = this.props

    dispatch(setRegion(region))
    dispatch(setSummoner(summoner))

    try {
      const { summonerData } = await dispatch(fetchSummonerData({ summoner, region }))
      const summonerId = summonerData.id

      await dispatch(fetchSummonerLeague({ summonerId, region }))
      await dispatch(fetchSummonerRecentMatches({ summonerId, region }))
    } catch (error) {
      // TODO: Handle errors in requests. Dispatch an `error action`
      console.error(error)
    }
  }

  render () {
    return (
      <div className='search-results-container'>
        <SummonerContainer />
        <MatchesContainer />
      </div>
    )
  }
}

SearchResultsContainer.propTypes = {
  dispatch: PropTypes.func,
  routeParams: PropTypes.object
}

function mapStateToProps (state) {
  return {
    summoner: state.summoner,
    region: state.region
  }
}

export default connect(mapStateToProps)(SearchResultsContainer)
