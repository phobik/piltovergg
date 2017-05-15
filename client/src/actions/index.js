export const setSummoner = (summoner) => {
  return {
    type: 'SET_SUMMONER',
    summoner
  }
}

export const setRegion = (region) => {
  return {
    type: 'SET_REGION',
    region
  }
}

export const setSummonerData = (data) => {
  return {
    type: 'SET_SUMMONER_DATA',
    data
  }
}

export const setStatsData = (data) => {
  return {
    type: 'SET_STATS_DATA',
    data
  }
}

export const requestSummonerData = (summoner, region) => {
  return {
    type: 'REQUEST_SUMMONER_DATA',
    summoner,
    region
  }
}

export const receiveSummonerData = (summoner, region, summonerData) => {
  return {
    type: 'RECEIVE_SUMMONER_DATA',
    summoner,
    region,
    summonerData,
    receivedAt: Date.now()
  }
}

export const requestSummonerStats = (summonerId, region) => {
  return {
    type: 'REQUEST_SUMMONER_STATS',
    summonerId,
    region
  }
}

export const receiveSummonerStats = (summonerId, region, summonerStats) => {
  return {
    type: 'RECEIVE_SUMMONER_STATS',
    summonerId,
    region,
    summonerStats,
    receivedAt: Date.now()
  }
}

export const requestSummonerLeague = (summonerId, region) => {
  return {
    type: 'REQUEST_SUMMONER_LEAGUE',
    summonerId,
    region
  }
}

export const receiveSummonerLeague = (summonerId, region, summonerLeague) => {
  return {
    type: 'RECEIVE_SUMMONER_LEAGUE',
    summonerId,
    region,
    summonerLeague,
    receivedAt: Date.now()
  }
}

export const requestSummonerRecentMatches = (summonerId, region) => {
  return {
    type: 'REQUEST_SUMMONER_RECENT_MATCHES',
    summonerId,
    region
  }
}

export const receiveSummonerRecentMatches = (summonerId, region, summonerMatches) => {
  return {
    type: 'RECEIVE_SUMMONER_RECENT_MATCHES',
    summonerId,
    region,
    summonerMatches,
    receivedAt: Date.now()
  }
}

export const fetchSummonerData = ({ summoner, region }) => {
  return (dispatch) => {
    dispatch(requestSummonerData(summoner, region))

    return window.fetch(`/api/summoners/${region}/${summoner}`)
      .then((response) => response.json())
      .then((data) => dispatch(receiveSummonerData(summoner, region, data)))
  }
}

export const fetchSummonerStats = ({ summonerId, region }) => {
  return (dispatch) => {
    dispatch(requestSummonerStats(summonerId, region))

    return window.fetch(`/api/summoners/${region}/${summonerId}/stats`)
      .then((response) => response.json())
      .then((data) => dispatch(receiveSummonerStats(summonerId, region, data)))
  }
}

export const fetchSummonerLeague = ({ summonerId, region }) => {
  return (dispatch) => {
    dispatch(requestSummonerLeague(summonerId, region))

    return window.fetch(`/api/summoners/${region}/${summonerId}/league`)
      .then((response) => response.json())
      .then((data) => dispatch(receiveSummonerLeague(summonerId, region, data)))
  }
}

export const fetchSummonerRecentMatches = ({ summonerId, region }) => {
  return (dispatch) => {
    dispatch(requestSummonerRecentMatches(summonerId, region))

    return window.fetch(`/api/summoners/${region}/${summonerId}/matches`)
      .then((response) => response.json())
      .then((data) => dispatch(receiveSummonerRecentMatches(summonerId, region, data.matches)))
  }
}
