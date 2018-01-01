import React, { Component, PropTypes } from 'react'

import MatchesContainer from './MatchesContainer'
import RankingContainer from './RankingContainer'
import SummonerContainer from './SummonerContainer'

class SearchResultsContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isFetching: true,
      summonerData: null
    }
  }

  async componentDidMount() {
    const { summoner, region } = this.props.routeParams

    try {
      const summonerData = await fetchSummonerData({ summoner, region })

      this.setState({
        summonerData,
        isFetching: false
      })
    } catch (error) {
      // TODO: Handle errors in requests. Dispatch an `error action`
      console.error(error)
    }
  }

  render() {
    const { region } = this.props.routeParams

    if (this.state.isFetching) {
      return <div className="loader" />
    }

    console.log(this.state)

    return (
      <div className="search-results-container">
        <SummonerContainer
          summonerData={this.state.summonerData}
          summonerId={this.state.summonerData.id}
          region={region}
        />

        <RankingContainer />

        <MatchesContainer
          summonerId={this.state.summonerData.id}
          region={region}
        />
      </div>
    )
  }
}

SearchResultsContainer.propTypes = {
  routeParams: PropTypes.object
}

async function fetchSummonerData({ summoner, region }) {
  const response = await window.fetch(`/api/summoners/${region}/${summoner}`)

  return await response.json()
}

export default SearchResultsContainer
