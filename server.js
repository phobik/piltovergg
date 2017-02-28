// Load environment variables
require('dotenv').config()

const express = require('express')
const matches = require('./lib/matches')
const morgan = require('morgan')
const summoners = require('./lib/summoners')

const app = express()

const logger = morgan('dev')

app.use(logger)

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
}

// TODO: Move routes/handler methods into their own modules
app.get('/api/summoners/:region/:name', async (request, response) => {
  const { name, region } = request.params
  try {
    const data = await summoners.getByName({ name, region })
    response.send(data)
  } catch (error) {
    console.error(error)
    response.send(error)
  }
})

app.get('/api/summoners/:region/:id/stats', async (request, response) => {
  const { id, region } = request.params

  try {
    const data = await summoners.getStatsById({ summonerId: id, region })
    response.send(data)
  } catch (error) {
    console.error(error)
    response.send(error)
  }
})

app.get('/api/summoners/:region/:id/league', async (request, response) => {
  const { id, region } = request.params

  try {
    const data = await summoners.getLeagueById({ summonerId: id, region })
    response.send(data)
  } catch (error) {
    console.error(error)
    response.send(error)
  }
})

app.get('/api/summoners/:region/:id/matches', async (request, response) => {
  const { id, region } = request.params

  try {
    const data = await matches.getMatchesBySummonerId({ summonerId: id, region })
    response.send(data)
  } catch (error) {
    console.error(error)
    response.send(error)
  }
})

const port = process.env.PORT || 8000

app.listen(port, () => {
  console.log('app running on port', port)
})
