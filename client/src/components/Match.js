import React, { Component } from 'react'

class Match extends Component {
  render () {
    const matchDetails = this.props.details
    const summonerId = this.props.summonerId

    // Set up timestamp/match duration presentation
    const msPlayedAgo = new Date() - new Date(matchDetails.matchCreation)
    const playedAgoString = getPlayedAgoString((msPlayedAgo))
    const matchDuration = matchDetails.matchDuration

    // Champion played image + TODO: item images
    const championImgSrc = this.props.championThumbnailUrl

    // Grab the matching Participant and ParticipantIdentity objects
    const participant = matchDetails.participants.find((p) => p.summonerId === summonerId)
    const identity = matchDetails.participantIdentities.find((pi) => pi.participantId === participant.participantId)

    console.log(participant, identity)

    // Display this match as either a win or loss
    const winningTeamId = matchDetails.teams.find((team) => team.winner).teamId


    const durationString = `${Math.floor(matchDuration / 60)}m ${matchDuration % 60}s`

    return (
      <div className="match card">
        <p className="match-played-at">
          {playedAgoString}
        </p>
        <p className="match-duration">
          Match duration: {durationString}
        </p>
        <img className="match-champion" src={championImgSrc} role="presentation"/>
      </div>
    )
  }
}

function getPlayedAgoString(msPlayedAgo) {
  const MILLISECONDS_PER_DAY = (1000 * 60 * 60 * 24)
  const MILLISECONDS_PER_HOUR = (1000 * 60 * 60)
  const MILLISECONDS_PER_MINUTE= (1000 * 60)

  const daysPlayedAgo = Math.floor(msPlayedAgo / MILLISECONDS_PER_DAY)

  if (daysPlayedAgo > 0) {
    return `${daysPlayedAgo} days ago`
  }

  const hoursPlayedAgo = Math.floor(msPlayedAgo / MILLISECONDS_PER_HOUR)

  if (hoursPlayedAgo > 0) {
    return `${hoursPlayedAgo} hours ago`
  }

  const minutesPlayedAgo = Math.floor(msPlayedAgo / MILLISECONDS_PER_MINUTE)

  if (minutesPlayedAgo > 0) {
    return `${minutesPlayedAgo} minutes ago`
  }

  return 'a few seconds ago'
}

export default Match
