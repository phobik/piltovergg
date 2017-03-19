const api = require('./api')
const cache = require('./cache')
const utils = require('./utils')
const marshaller = require('./utils/marshaller')

const cacheClient = cache.getClient()
const { CACHE_EXPIRY_SECONDS } = require('./constants')

exports.getMatchesBySummonerId = async ({ summonerId, region }) => {
  const matchList = await getMatchList({ summonerId, region })

  await Promise.all(matchList.matches.map(async (match) => {
    match.details = await getMatchDetailsByMatchId({ summonerId, matchId: match.matchId, region })
  }))

  return matchList
}

async function getMatchDetailsByMatchId ({ matchId, summonerId, region }) {
  const cacheKey = `match-${region}-${matchId}-details`

  const cacheResponse = await cacheClient.getAsync(cacheKey)

  if (cacheResponse) {
    return JSON.parse(cacheResponse)
  }

  const matchDetails = await api.getMatchDetailsByMatchId({ matchId, region })

  const match = marshaller.marshallMatch({ summonerId, matchData: matchDetails })

  await cacheClient.setexAsync(cacheKey, CACHE_EXPIRY_SECONDS, JSON.stringify(match))

  return match
}

async function getMatchList ({ summonerId, region }) {
  const cacheKey = `${summonerId}-${region}-matchlist`

  const cacheResponse = await cacheClient.getAsync(cacheKey)

  if (cacheResponse) {
    return JSON.parse(cacheResponse)
  }

  const matchList = await api.getMatchListBySummonerId({ summonerId, region })

  matchList.matches.forEach((match) => {
    match.championThumbnailUrl = utils.getChampionThumbnailUrl(match.champion)
  })

  await cacheClient.setexAsync(cacheKey, CACHE_EXPIRY_SECONDS, JSON.stringify(matchList))

  return matchList
}
