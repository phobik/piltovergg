const initialState = {
  summoner: '',
  region: ''
}

// TODO: Split out/clean up reducers using `combineReducers`
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SUMMONER':
      return { ...state, summoner: action.summoner }
    case 'SET_REGION':
      return { ...state, region: action.region }
    case 'REQUEST_SUMMONER_DATA':
      return { ...state, isFetching: true }
    case 'RECEIVE_SUMMONER_DATA':
      return { ...state, isFetching: false, summonerData: action.summonerData }
    case 'REQUEST_SUMMONER_STATS':
      return { ...state, isFetching: true }
    case 'RECEIVE_SUMMONER_STATS':
      return { ...state, isFetching: false, summonerStats: action.summonerStats }
    case 'REQUEST_SUMMONER_LEAGUE':
      return { ...state, isFetching: true }
    case 'RECEIVE_SUMMONER_LEAGUE':
      return { ...state, isFetching: false, summonerLeague: action.summonerLeague }
    case 'REQUEST_SUMMONER_RECENT_MATCHES':
      return { ...state, isFetching: true }
    case 'RECEIVE_SUMMONER_RECENT_MATCHES':
      return { ...state, isFetching: false, summonerMatches: action.summonerMatches }
    default:
      return state
  }
}

export default reducer
