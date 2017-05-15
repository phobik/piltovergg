const championData = require('../../data/champions')

exports.getChampionThumbnailUrl = (championId) => {
  const baseUrl = 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/'

  if (!championData[championId]) {
    return `${baseUrl}${championData[Object.keys(championData)[0]]}.png`
  }

  const championKey = championData[championId].key

  return `${baseUrl}${championKey}.png`
}
