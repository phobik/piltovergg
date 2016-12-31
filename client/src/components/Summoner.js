import React, { Component } from 'react'

class Summoner extends Component {
  render () {
    const { summonerData, leagueData } = this.props

    const profileImageId = summonerData.profileIconId
    const profileIconSrc = `http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/${profileImageId}.png`

    const divison = leagueData.entries[0].division
    const tier = leagueData.tier

    const rankString = `${tier} ${divison}`

    return (
      <div className="summoner">
        <img src={profileIconSrc} alt="Profile Icon" className="profile-icon" />
        <div className="summoner-info">
          <h2 className="summoner-name">{summonerData.name}</h2>
          Level {summonerData.summonerLevel} - {rankString}
        </div>
      </div>
    )
  }
}

export default Summoner
