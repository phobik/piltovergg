const api = require('./api')
const cache = require('./cache')
const marshaller = require('./utils/marshaller')

const { CACHE_EXPIRY_SECONDS } = require('./constants')

const cacheClient = cache.getClient()

exports.getByName = async ({ name, region }) => {
  const cacheKey = getBaseSummonerCacheKey({ name, region })

  const cacheResponse = await cacheClient.getAsync(cacheKey)

  if (cacheResponse) {
    return JSON.parse(cacheResponse)
  }

  return await cacheSummonerObject({ name, region, cacheKey })
}

exports.getLeagueById = async ({ summonerId, region }) => {
  const cacheKey = `${summonerId}-${region}-league`

  const cacheResponse = await cacheClient.getAsync(cacheKey)

  if (cacheResponse) {
    return JSON.parse(cacheResponse)
  }

  return await cacheSummonerLeague({ summonerId, region, cacheKey })
}

exports.getStatsById = async ({ summonerId, region }) => {
  const cacheKey = `${summonerId}-${region}-stats`

  const cacheResponse = await cacheClient.getAsync(cacheKey)

  if (cacheResponse) {
    return JSON.parse(cacheResponse)
  }

  return await cacheSummonerStats({ summonerId, region, cacheKey })
}

async function cacheSummonerLeague ({ summonerId, region, cacheKey }) {
  const league = await api.getLeagueBySummonerId({ summonerId, region })

  await cacheClient.setex(cacheKey, CACHE_EXPIRY_SECONDS, JSON.stringify(league))

  return league
}

async function cacheSummonerObject ({ name, region, cacheKey }) {
  const summonerData = await api.getSummonerByName({ name, region })
  const marshalledData = marshaller.marshallSummonerData(summonerData)

  await cacheClient.setexAsync(cacheKey, CACHE_EXPIRY_SECONDS, JSON.stringify(marshalledData))

  return marshalledData
}

async function cacheSummonerStats ({ summonerId, region, cacheKey }) {
  const summary = await api.getStatsSummary({ summonerId, region })
  const ranked = await api.getRankedStats({ summonerId, region })

  const summonerStats = { summary, ranked }

  await cacheClient.setexAsync(cacheKey, CACHE_EXPIRY_SECONDS, JSON.stringify(summonerStats))

  return summonerStats
}

function getBaseSummonerCacheKey ({ name, region }) {
  return `${name}-${region}`
}
