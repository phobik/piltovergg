const RateLimiter = require('request-rate-limiter')

const apiKey = process.env.RIOT_API_KEY
const limiter = new RateLimiter({
  rate: process.env.RATE_LIMIT,
  interval: process.env.RATE_LIMIT_INTERVAL
})

exports.getSummonerByName = ({ name, region }) => {
  const url = `https://${region}.api.pvp.net/api/lol/${region}/v1.4/summoner/` +
    `by-name/${name}?api_key=${apiKey}`

  return makeRequest(url)
}

exports.getStatsSummary = ({ summonerId, region }) => {
  const url = `https://${region}.api.pvp.net/api/lol/${region}/v1.3/stats/` +
   `by-summoner/${summonerId}/summary?api_key=${apiKey}`

  return makeRequest(url)
}

exports.getRankedStats = ({ summonerId, region }) => {
  const url = `https://${region}.api.pvp.net/api/lol/${region}/v1.3/stats/` +
   `by-summoner/${summonerId}/ranked?api_key=${apiKey}`

  return makeRequest(url)
}

exports.getMatchListBySummonerId = ({ summonerId, region }) => {
  // TODO: Allow pagination parameters (beginIndex, endIndex) here - only returning the
  // 10 most recent matches for now.
  const url = `https://${region}.api.pvp.net/api/lol/${region}/v2.2/matchlist/` +
    `by-summoner/${summonerId}?api_key=${apiKey}&beginIndex=0&endIndex=10`

  return makeRequest(url)
}

exports.getMatchDetailsByMatchId = ({ matchId, region }) => {
  const url = `https://${region}.api.pvp.net/api/lol/${region}/v2.2/match/${matchId}` +
    `?api_key=${apiKey}`

  return makeRequest(url)
}

exports.getLeagueBySummonerId = ({ summonerId, region }) => {
  const url = `https://${region}.api.pvp.net/api/lol/${region}/v2.5/league/` +
    `by-summoner/${summonerId}/entry?api_key=${apiKey}`

  return makeRequest(url)
}

function makeRequest (url) {
  return limiter.request({ url, method: 'get' })
    .then((response) => JSON.parse(response.body))
}
