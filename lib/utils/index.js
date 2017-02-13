const championData = require('../../data/champions')

exports.getChampionThumbnailUrl = (championId) => {
  const baseUrl = 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/'
  const championKey = championData[championId].key

  return `${baseUrl}/${championKey}.png`
}
