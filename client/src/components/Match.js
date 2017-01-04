import React, { Component } from 'react'

class Match extends Component {
  render () {
    const msPlayedAgo = new Date() - new Date(this.props.details.matchCreation)
    const playedAgoString = getPlayedAgoString((msPlayedAgo))

    const matchDuration = this.props.details.matchDuration
    const championImgSrc = this.props.championThumbnailUrl

    const winningTeamId = this.props.details.teams.find((team) => team.winner).teamId

    const durationString = `${Math.floor(matchDuration / 60)}m ${matchDuration % 60}s`

    return (
      <div className="match card">
        <p className="match-played-at">
          {playedAgoString}
        </p>
        <p className="match-duration">
          Match duration: {durationString}
        </p>
        <img className="match-champion" src={championImgSrc}/>
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
