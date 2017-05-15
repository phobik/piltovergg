import React, { Component, PropTypes } from 'react'

import MatchesContainer from './MatchesContainer'
import SummonerContainer from './SummonerContainer'

class SearchResultsContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isFetching: true,
      summonerData: null,
      summonerLeague: null,
      summonerMatches: null
    }
  }
  async componentDidMount () {
    const { summoner, region } = this.props.routeParams

    try {
      // Fetch summoner data -> summoner league -> summoner recent matches
      const summonerData = await fetchSummonerData({ summoner, region })
      const summonerId = summonerData.id

      const summonerLeague = await fetchSummonerLeague({ summonerId, region })
      const summonerMatches = (await fetchSummonerMatches({ summonerId, region })).matches

      this.setState({ summonerData, summonerLeague, summonerMatches, isFetching: false })
    } catch (error) {
      // TODO: Handle errors in requests. Dispatch an `error action`
      console.error(error)
    }
  }

  render () {
    if (this.state.isFetching) {
      return <div className='loader' />
    }

    return (
      <div className='search-results-container'>
        <SummonerContainer summoner={this.state.summonerData} league={this.state.summonerLeague} />
        <MatchesContainer matches={this.state.summonerMatches} />
      </div>
    )
  }
}

SearchResultsContainer.propTypes = {
  routeParams: PropTypes.object
}

async function fetchSummonerData ({ summoner, region }) {
  const response = await window.fetch(`/api/summoners/${region}/${summoner}`)

  return await response.json()
}

async function fetchSummonerLeague ({ summonerId, region }) {
  const response = await window.fetch(`/api/summoners/${region}/${summonerId}/league`)

  return await response.json()
}

async function fetchSummonerMatches ({ summonerId, region }) {
  const response = await window.fetch(`/api/summoners/${region}/${summonerId}/matches`)

  return await response.json()
}

export default SearchResultsContainer
