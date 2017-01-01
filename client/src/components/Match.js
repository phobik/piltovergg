import React, { Component } from 'react'

class Match extends Component {
  render () {
    const playedAt = parseMatchTimestamp(this.props.details.matchCreation)
    const matchDuration = this.props.details.matchDuration

    const participants = marshallParticipants(
      this.props.details.participants,
      this.props.details.participantIdentities
    )

    const blueTeamPlayerNodes = participants[100].map((p) => {
      return (
        <div className="blue-team-player" key={p.participant.participantId}>
          <img src={p.participant.championThumbnailUrl} />
          <span className="player-name">{p.identity.player.summonerName}</span>
        </div>
      )
    })

    const redTeamPlayerNodes = participants[200].map((p) => {
      return (
        <div className="red-team-player" key={p.participant.participantId}>
          <span className="player-name">{p.identity.player.summonerName}</span>
          <img src={p.participant.championThumbnailUrl} />
        </div>
      )
    })

    const participantNodes = (
      <div className="participant-container">
        <div className="blue-team">
          {blueTeamPlayerNodes}
        </div>
        <div className="red-team">
          {redTeamPlayerNodes}
        </div>
      </div>
    )

    const durationString = `${Math.floor(matchDuration / 60)}m ${matchDuration % 60}s`
    return (
      <div className="match card">
        <p className="match-played-at">
          {playedAt}
        </p>
        <p className="match-duration">
          Match duration: {durationString}
        </p>
        {participantNodes}
      </div>
    )
  }
}

function parseMatchTimestamp (timestamp) {
  const monthNames = [
    'January', 'February', 'March',
    'April', 'May', 'June',
    'July', 'August', 'September',
    'October', 'November', 'December'
];

  const playedAt = new Date(timestamp)
  const month = monthNames[playedAt.getMonth()]
  const day = playedAt.getDate()
  const year = 1900 + playedAt.getYear()

  return `${month} ${day}, ${year}`
}

function marshallParticipants (participants, participantIdentities) {
  return participants.reduce((result, participant) => {
    const identity = participantIdentities.find((p) => p.participantId === participant.participantId)
    result[participant.teamId].push({ participant, identity })

    return result
  }, { 100: [], 200: [] })
}

export default Match
