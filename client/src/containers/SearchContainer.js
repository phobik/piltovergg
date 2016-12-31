import React, { Component } from 'react'
import { connect } from 'react-redux'

import Search from '../components/Search'

class SearchContainer extends Component {
  render () {
    return (
      <div className="search-container">
        <Search {...this.props} />
      </div>
    )
  }
}

export default connect()(SearchContainer)
