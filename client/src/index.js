import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import App from './containers/App';
import React from 'react';
import ReactDOM from 'react-dom';
import reducer from './reducers'
import SearchResultsContainer from './containers/SearchResultsContainer'
import thunk from 'redux-thunk'

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

const Root = ({ store }) => {
  return (
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={App} />
        <Route path="/summoners/:region/:summoner" component={SearchResultsContainer} />
      </Router>
    </Provider>
  )
}

ReactDOM.render(Root({ store }), document.getElementById('root'));
