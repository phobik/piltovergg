import React, { Component, PropTypes } from 'react'

class Match extends Component {
  render () {
    const { details, championThumbnailUrl } = this.props

    // TODO: Potentially move parts of this data marshalling process to the server
    const { playedAgoString, durationString } = getTimeStamps(details)
    const { summonerParticipant, summonerSpell1Img, summonerSpell2Img } = details
    const items = getItems(summonerParticipant)

    // Grab relevant values out of the summoner's stats
    const { kills, deaths, assists, goldEarned } = summonerParticipant.stats

    const matchCardClassName = details.isWin ? 'match card win' : 'match card loss'

    return (
      <div className={matchCardClassName}>
        <div className='match-left'>
          <img className='match-champion' src={championThumbnailUrl} alt='' />
          <div className='match-summoner-spells-container'>
            <img className='summoner-spell' src={summonerSpell1Img} alt={summonerParticipant.summonerSpell1Key} />
            <img className='summoner-spell' src={summonerSpell2Img} alt={summonerParticipant.summonerSpell2Key} />
          </div>
        </div>

        <div className='match-summoner-stats'>
          <span className='kills'>{kills}</span>/
          <span className='deaths'>{deaths}</span>/
          <span className='assists'>{assists}</span>
        </div>

        <div className='items-container'>
          {items}
        </div>

        <div className='match-timestamps-container'>
          <span>{playedAgoString}</span>
          <span>{durationString}</span>
          <span>{goldEarned}g</span>
        </div>
      </div>
    )
  }
}

Match.propTypes = {
  championThumbnailUrl: PropTypes.string,
  details: PropTypes.object,
  summonerId: PropTypes.number
}

// Extract items out of the match details and assign placeholder images/image elements where appropriate
function getItems (summonerParticipant) {
  return ['item0', 'item1', 'item2', 'item3', 'item4', 'item5'].map((key, index) => {
    const id = summonerParticipant.stats[key]

    // TODO: Actual placeholder image
    const src = id === 0
      ? 'http://www.clipartkid.com/images/656/white-square-clip-art-at-clker-com-vector-clip-art-online-royalty-12bI8H-clipart.png'
      : `http://ddragon.leagueoflegends.com/cdn/7.9.2/img/item/${id}.png`

    return (
      // TODO: Alt text + item tooltips on hover
      <img key={index} className='item-img' src={src} alt='item' />
    )
  })
}

// Generate user-friendly time information from the timestamps included in the API response
function getPlayedAgoString (msPlayedAgo) {
  const MILLISECONDS_PER_DAY = (1000 * 60 * 60 * 24)
  const MILLISECONDS_PER_HOUR = (1000 * 60 * 60)
  const MILLISECONDS_PER_MINUTE = (1000 * 60)

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

// Timestamps need to be calculated on the client since the server does heavy caching
function getTimeStamps (details) {
  const msPlayedAgo = new Date() - new Date(details.matchCreation)
  const playedAgoString = getPlayedAgoString((msPlayedAgo))

  const { matchDuration } = details
  const durationString = `${Math.floor(matchDuration / 60)}m ${matchDuration % 60}s`

  return { playedAgoString, durationString }
}

export default Match
