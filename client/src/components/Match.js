import React, { Component } from 'react'

class Match extends Component {
  render () {
    const matchDetails = this.props.details
    const summonerId = this.props.summonerId

    // Set up timestamp/match duration presentation
    const msPlayedAgo = new Date() - new Date(matchDetails.matchCreation)
    const playedAgoString = getPlayedAgoString((msPlayedAgo))
    const matchDuration = matchDetails.matchDuration

    // TODO: item images
    const championImgSrc = this.props.championThumbnailUrl

    // Find the corresponding `participant` and `participantIentity` objects
    // based on the `summonerId` of the summoner being searched
    const summonerIdentity = matchDetails.participantIdentities
      .find((pi) => pi.player.summonerId === summonerId)
    const summonerParticipant = matchDetails.participants
      .find((p) => p.participantId === summonerIdentity.participantId)

    // Grab KDA values out of the summoner's stats
    const { kills, deaths, assists } = summonerParticipant.stats

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

        <img className="match-champion" src={championImgSrc} role="presentation"/>

        <div className="match-summoner-stats">
          <span className="kills">{kills}</span>/
          <span className="deaths">{deaths}</span>/
          <span className="assists">{assists}</span>
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
