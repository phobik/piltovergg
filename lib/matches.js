const api = require('./api')
const cache = require('./cache')
const utils = require('./utils')

const cacheClient = cache.getClient()

exports.getMatchesBySummonerId = ({ summonerId, region }) => {
  return getMatchList({ summonerId, region })
    .then((matchList) => {
      // Get detailed data for each match in the provided `matchList` - don't
      // resolve until all matches have their details set
      return Promise.all(matchList.matches.map((match) => {
        return getMatchDetailsByMatchId({ matchId: match.matchId, region })
          .then((matchDetails) => {
            // Set a `details` property on the `match` entity containing
            // this detailed data set
            match.details = matchDetails
          })
      }))
      .then(() => matchList)
    })
}

function getMatchDetailsByMatchId({ matchId, region }) {
  const cacheKey = `match-${region}-${matchId}-details`

  return cacheClient.getAsync(cacheKey)
    .then((cacheResponse) => {
      if (cacheResponse) {
        return JSON.parse(cacheResponse)
      }

      return api.getMatchDetailsByMatchId({ matchId, region })
        .then((matchDetails) => {
          // TODO: Marshall `matchDetails` responses - this will likely be our
          // heaviest data manipulation process to get these objects into a state
          // where they're workable on the client.

          // Add champion thumbnails for each `participant`
          matchDetails.participants.forEach((participant) => {
            participant.championThumbnailUrl = utils.getChampionThumbnailUrl(participant.championId)
          })

          return matchDetails
        })
        .then((matchDetails) => matchDetails)
    })
}

function getMatchList({ summonerId, region }) {
  const cacheKey = `${summonerId}-${region}-matchlist`

  return cacheClient.getAsync(cacheKey)
    .then((cacheResponse) => {
      if (cacheResponse) {
        return JSON.parse(cacheResponse)
      }

      return api.getMatchListBySummonerId({ summonerId, region })
        .then((matchList) => {
          matchList.matches.forEach((match) => {
            match.championThumbnailUrl = utils.getChampionThumbnailUrl(match.champion)
          })

          return matchList
        })
        .then((matchList) => matchList)
    })
}