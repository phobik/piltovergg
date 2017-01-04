const api = require('./api')
const cache = require('./cache')
const utils = require('./utils')

// TODO: Determine a good expiry value for caching summoner objects
// TODO: Support manual renewing of summoner data w/ restrictions
const CACHE_EXPIRY_SECONDS = 6000

const cacheClient = cache.getClient()

exports.getByName = ({ name, region }) => {
  const cacheKey = getBaseSummonerCacheKey({ name, region })

  return cacheClient.getAsync(cacheKey)
    .then((cacheResponse) => {
      // If a cache entry exists for this summoner object, just fetch from cache and return
      if (cacheResponse) {
        return JSON.parse(cacheResponse)
      }

      // Otherwise, fetch from the Riot API and create the new cache entry before returning
      return cacheSummonerObject({ name, region, cacheKey })
    })
    .then((data) => data)
}

exports.getStatsById = ({ summonerId, region }) => {
  const cacheKey = `${summonerId}-${region}-stats`

  return cacheClient.getAsync(cacheKey)
    .then((cacheResponse) => {
      if (cacheResponse) {
        return JSON.parse(cacheResponse)
      }

      return cacheSummonerStats({ summonerId, region, cacheKey })
    })
}

exports.getMatchListById = ({ summonerId, region }) => {
  const cacheKey = `${summonerId}-${region}-matchlist`

  return cacheClient.getAsync(cacheKey)
    .then((cacheResponse) => {
      if (cacheResponse) {
        return JSON.parse(cacheResponse)
      }

      return cacheSummonerMatchList({ summonerId, region, cacheKey })
    })
}

exports.getMatchDetailsById = ({ matchId, region }) => {
  const cacheKey = `${matchId}-${region}-match`

  return cacheClient.getAsync(cacheKey)
    .then((cacheResponse) => {
      if (cacheResponse) {
        return JSON.parse(cacheResponse)
      }

      return cacheMatch({ matchId, region, cacheKey })
    })
}
exports.getLeagueById = ({ summonerId, region }) => {
  const cacheKey = `${summonerId}-${region}-league`

  return cacheClient.getAsync(cacheKey)
    .then((cacheResponse) => {
      if (cacheResponse) {
        return JSON.parse(cacheResponse)
      }

      return cacheSummonerLeague({ summonerId, region, cacheKey })
    })
}

function cacheSummonerObject ({ name, region, cacheKey }) {
  let summonerData

  return api.getSummonerByName({ name, region })
    .then((data) => {
      summonerData = data
      return cacheClient.setexAsync(cacheKey, CACHE_EXPIRY_SECONDS, JSON.stringify(summonerData))
    })
    .then(() => summonerData)
}

function cacheSummonerStats ({ summonerId, region, cacheKey }) {
  let summonerStats = {}

  return api.getStatsSummary({ summonerId, region })
    .then((statsSummary) => {
      summonerStats.summary = statsSummary
      return api.getRankedStats({ summonerId, region })
    })
    .then((rankedStats) => {
      summonerStats.ranked = rankedStats
      return cacheClient.setexAsync(cacheKey, CACHE_EXPIRY_SECONDS, JSON.stringify(summonerStats))
    })
    .then(() => summonerStats)
}

function cacheSummonerMatchList ({ summonerId, region, cacheKey }) {
  let matchList

  return api.getMatchListBySummonerId({ summonerId, region })
    .then((data) => {
      matchList = data

      matchList.matches.forEach((match) => {
        match.championThumbnailUrl = utils.getChampionThumbnailUrl(match.champion)
      })

      return cacheClient.setexAsync(cacheKey, CACHE_EXPIRY_SECONDS, JSON.stringify(matchList))
    })
    .then(() => matchList)
}

function cacheSummonerLeague ({ summonerId, region, cacheKey }) {
  let league

  return api.getLeagueBySummonerId({ summonerId, region })
    .then((data) => {
      league = data
      return cacheClient.setex(cacheKey, CACHE_EXPIRY_SECONDS, JSON.stringify(league))
    })
    .then(() => league)
}

function cacheMatch ({ matchId, region, cacheKey }) {
  let matchDetails

  return api.getMatchDetailsByMatchId({ matchId, region })
    .then((data) => {
      matchDetails = data

      // Add the champion's image URL to each participant object
      matchDetails.participants.forEach((participant) => {
        participant.championThumbnailUrl = utils.getChampionThumbnailUrl(participant.championId)
      })

      return cacheClient.setex(cacheKey, CACHE_EXPIRY_SECONDS, JSON.stringify(matchDetails))
    })
    .then(() => matchDetails)
}

function getBaseSummonerCacheKey ({ name, region }) {
  return `${name}-${region}`
}
