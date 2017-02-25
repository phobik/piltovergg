const api = require('./api')
const cache = require('./cache')
const marshaller = require('./utils/marshaller')

const { CACHE_EXPIRY_SECONDS } = require('./constants')

const cacheClient = cache.getClient()

exports.getByName = ({ name, region }) => {
  const cacheKey = getBaseSummonerCacheKey({ name, region })

  return cacheClient.getAsync(cacheKey)
    .then((cacheResponse) => {
      if (cacheResponse) {
        return JSON.parse(cacheResponse)
      }

      return cacheSummonerObject({ name, region, cacheKey })
    })
    .then((data) => data)
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

function cacheSummonerLeague ({ summonerId, region, cacheKey }) {
  let league

  return api.getLeagueBySummonerId({ summonerId, region })
    .then((data) => {
      league = data
      return cacheClient.setex(cacheKey, CACHE_EXPIRY_SECONDS, JSON.stringify(league))
    })
    .then(() => league)
}

function cacheSummonerObject ({ name, region, cacheKey }) {
  let summonerData

  return api.getSummonerByName({ name, region })
    .then((data) => {
      summonerData = marshaller.marshallSummonerData(data)
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

function getBaseSummonerCacheKey ({ name, region }) {
  return `${name}-${region}`
}
