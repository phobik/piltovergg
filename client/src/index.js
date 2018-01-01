import { Router, Route, browserHistory } from 'react-router'
import App from './containers/App'
import React from 'react'
import ReactDOM from 'react-dom'
import SearchResultsContainer from './containers/SearchResultsContainer'

const root = (
  <Router history={browserHistory}>
    <Route path='/' component={App} />
    <Route path='/summoners/:region/:summoner' component={SearchResultsContainer} />
  </Router>
)

ReactDOM.render(root, document.getElementById('root'))
