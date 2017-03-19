const utils = require('./index')
const summonerSpellData = require('../../data/summoner-spells.json').data

exports.marshallSummonerData = (data) => {
  // Riot's Summoner data response nests the actual data under a key of
  // the summoner's name. Flatten the structure and include the actual URL
  // for the profile icon image instead of just an ID
  const result = data[Object.keys(data)[0]]
  const { profileIconId } = result
  result.profileIconImage = `http://ddragon.leagueoflegends.com/cdn/7.3.1/img/profileicon/${profileIconId}.png`

  return result
}

exports.marshallMatch = ({ summonerId, matchData }) => {
   // Add champion thumbnails for each participant
  matchData.participants.forEach((participant) => {
    participant.championThumbnailUrl = utils.getChampionThumbnailUrl(participant.championId)
    participant.summonerSpell1Key = summonerSpellData[participant.spell1Id].key
    participant.summonerSpell2Key = summonerSpellData[participant.spell2Id].key
  })

  // Determine which identity and participant objects correspond to the requested summoner
  const summonerIdentity = matchData.participantIdentities
    .find((pi) => pi.player.summonerId === Number(summonerId))

  const summonerParticipant = matchData.participants
    .find((p) => p.participantId === summonerIdentity.participantId)

  // Add image URL's for summoner spells
  const summonerSpell1Img = `http://ddragon.leagueoflegends.com/cdn/7.4.1/img/spell/${summonerParticipant.summonerSpell1Key}.png`
  const summonerSpell2Img = `http://ddragon.leagueoflegends.com/cdn/7.4.1/img/spell/${summonerParticipant.summonerSpell2Key}.png`

  // Determine whether this match should be displayed as a win or loss based
  // on which summoner is being search for
  const winningTeamId = matchData.teams.find((team) => team.winner).teamId
  const isWin = summonerParticipant.teamId === winningTeamId

  const newProperties = { summonerIdentity, summonerParticipant, summonerSpell1Img, summonerSpell2Img, isWin }

  return Object.assign(matchData, newProperties)
}
