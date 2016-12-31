// Load environment variables
require('dotenv').config()

const cors = require('cors')
const express = require('express')
const morgan = require('morgan')
const summoners = require('./lib/summoners')

const app = express()

const logger = morgan('dev')

app.use(logger)
app.use(cors())

// TODO: Move routes/handler methods into their own modules + consider
// dynamically adding `catch` statements to each handle promise
app.get('/api/summoners/:region/:name', (request, response) => {
  const { name, region } = request.params

  summoners.getByName({ name, region })
    .then((data) => {
      response.send(data)
    })
    .catch((error) => {
      console.log(error)
      response.send(error)
    })
})

app.get('/api/summoners/:region/:id/stats', (request, response) => {
  const { id, region } = request.params

  summoners.getStatsById({ summonerId: id, region })
    .then((statsData) => {
      response.send(statsData)
    })
    .catch((error) => {
      console.log(error)
      response.send(error)
    })
})

app.get('/api/summoners/:region/:id/matches', (request, response) => {
  const { id, region } = request.params

  summoners.getMatchListById({ summonerId: id, region })
    .then((matchData) => {
      return Promise.all(matchData.matches.map((match) => {
        return summoners.getMatchDetailsById({ matchId: match.matchId, region })
          .then((details) => {
            match.details = details
          })
      }))
      .then(() => {
        response.send(matchData)
      })
    })
    .catch((error) => {
      console.log(error)
      response.send(error)
    })
})

app.get('/api/summoners/:region/:id/league', (request, response) => {
  const { id, region } = request.params

  summoners.getLeagueById({ summonerId: id, region })
    .then((leagueData) => {
      response.send(leagueData)
    })
    .catch((error) => {
      console.log(error)
      response.send(error)
    })
})

const port = process.env.PORT || 8000

app.listen(port, () => {
  console.log('app running on port', port)
})
