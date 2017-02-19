import React, { Component } from 'react'

class Match extends Component {
  render () {
    const matchDetails = this.props.details
    const { summonerId, championThumbnailUrl } = this.props

    // TODO: Potentially move parts of this data marshalling process
    // to the server or at the very least move it into separate methods
    // to clean up this `render` method.

    // Set up timestamp/match duration presentation
    const msPlayedAgo = new Date() - new Date(matchDetails.matchCreation)
    const playedAgoString = getPlayedAgoString((msPlayedAgo))
    const matchDuration = matchDetails.matchDuration

    // Find the corresponding `participant` and `participantIentity` objects
    // based on the `summonerId` of the summoner being searched
    const summonerIdentity = matchDetails.participantIdentities
      .find((pi) => pi.player.summonerId === summonerId)
    const summonerParticipant = matchDetails.participants
      .find((p) => p.participantId === summonerIdentity.participantId)

    const items = ['item0', 'item1', 'item2', 'item3', 'item4', 'item5'].map((key, index) => {
      const id = summonerParticipant.stats[key]

      // TODO: Actual placeholder image
      const src = id === 0 ?
        'http://www.clipartkid.com/images/656/white-square-clip-art-at-clker-com-vector-clip-art-online-royalty-12bI8H-clipart.png' :
        `http://ddragon.leagueoflegends.com/cdn/7.3.3/img/item/${id}.png`

      return (
        // TODO: Alt text + item tooltips on hover
        <img key={index} className="item-img" src={src} alt="item" />
      )
    })

    // Grab relevant values out of the summoner's stats
    const { kills, deaths, assists, goldEarned } = summonerParticipant.stats

    // Determine whether this match should be displayed as a win or loss based
    // on which summoner is being search for
    const winningTeamId = matchDetails.teams.find((team) => team.winner).teamId
    const isWin = summonerParticipant.teamId === winningTeamId
    const matchCardClassName = isWin ? "match card win" : "match card loss"

    // Prettify the match duration a bit
    const durationString = `${Math.floor(matchDuration / 60)}m ${matchDuration % 60}s`

    return (
      <div className={matchCardClassName}>
        <p className="match-played-at">
          {playedAgoString}
        </p>
        <p className="match-duration">
          Match duration: {durationString}
        </p>
        <p className="match-gold-earned">
          Gold Earned: {goldEarned}
        </p>

        <img className="match-champion" src={championThumbnailUrl} role="presentation"/>

        <div className="match-summoner-stats">
          <span className="kills">{kills}</span>/
          <span className="deaths">{deaths}</span>/
          <span className="assists">{assists}</span>

          <div className="items-container">
            {items}
          </div>
        </div>
      </div>
    )
  }
}

function getPlayedAgoString(msPlayedAgo) {
  const MILLISECONDS_PER_DAY = (1000 * 60 * 60 * 24)
  const MILLISECONDS_PER_HOUR = (1000 * 60 * 60)
  const MILLISECONDS_PER_MINUTE= (1000 * 60)

  const daysPlayedAgo = Math.floor(msPlayedAgo / MILLISECONDS_PER_DAY)

  // TODO: Non-lazy pluralization
  if (daysPlayedAgo > 0) {
    return `${daysPlayedAgo} day(s) ago`
  }

  const hoursPlayedAgo = Math.floor(msPlayedAgo / MILLISECONDS_PER_HOUR)

  if (hoursPlayedAgo > 0) {
    return `${hoursPlayedAgo} hour(s) ago`
  }

  const minutesPlayedAgo = Math.floor(msPlayedAgo / MILLISECONDS_PER_MINUTE)

  if (minutesPlayedAgo > 0) {
    return `${minutesPlayedAgo} minute(s) ago`
  }

  return 'a few seconds ago'
}

export default Match
