const summonerSpellData = require('../../data/summoner-spells.json')

exports.marshallSummonerData = (data) => {
  // Riot's Summoner data response nests the actual data under a key of
  // the summoner's name. Flatten the structure and include the actual URL
  // for the profile icon image instead of just an ID
  const result = data[Object.keys(data)[0]]
  const { profileIconId } = result
  result.profileIconImage = `http://ddragon.leagueoflegends.com/cdn/7.3.1/img/profileicon/${profileIconId}.png`

  return result
}
