import React, { Component, PropTypes } from 'react'

class Summoner extends Component {
  render () {
    const { summonerData, leagueData } = this.props

    const divison = leagueData.entries[0].division
    const tier = leagueData.tier

    const rankString = `${tier} ${divison}`

    return (
      <div className='summoner'>
        <img src={summonerData.profileIconImage} alt='Profile Icon' className='profile-icon' />
        <div className='summoner-info'>
          <h2 className='summoner-name'>{summonerData.name}</h2>
          Level {summonerData.summonerLevel} - {rankString}
        </div>
      </div>
    )
  }
}

Summoner.propTypes = {
  summonerData: PropTypes.object,
  leagueData: PropTypes.object
}

export default Summoner
