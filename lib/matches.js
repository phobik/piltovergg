const api = require('./api')
const cache = require('./cache')
const summonerSpellData = require('../data/summoner-spells').data
const utils = require('./utils')

const cacheClient = cache.getClient()
const { CACHE_EXPIRY_SECONDS } = require('./constants')

exports.getMatchesBySummonerId = async ({ summonerId, region }) => {
  const matchList = await getMatchList({ summonerId, region })

  await Promise.all(matchList.matches.map(async (match) => {
    match.details = await getMatchDetailsByMatchId({ matchId: match.matchId, region })
  }))

  return matchList
}

async function getMatchDetailsByMatchId ({ matchId, region }) {
  const cacheKey = `match-${region}-${matchId}-details`

  const cacheResponse = await cacheClient.getAsync(cacheKey)

  if (cacheResponse) {
    return JSON.parse(cacheResponse)
  }

  const matchDetails = api.getMatchDetailsByMatchId({ matchId, region })

  // Add champion thumbnails for each `participant`
  matchDetails.participants.forEach((participant) => {
    participant.championThumbnailUrl = utils.getChampionThumbnailUrl(participant.championId)
    participant.summonerSpell1Key = summonerSpellData[participant.spell1Id].key
    participant.summonerSpell2Key = summonerSpellData[participant.spell2Id].key
  })

  await cacheClient.setexAsync(cacheKey, CACHE_EXPIRY_SECONDS, JSON.stringify(matchDetails))

  return matchDetails
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
