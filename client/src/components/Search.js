import React, { Component } from 'react'

class Search extends Component {
  constructor (props) {
    super(props)

    this.state = { summoner: '', region: '' }

    this.handleSummonerChange = this.handleSummonerChange.bind(this)
    this.handleRegionChange = this.handleRegionChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSummonerChange (event) {
    const summoner = event.target.value.trim()

    this.setState({ summoner })
  }

  handleRegionChange (event) {
    const region = event.target.value

    this.setState({ region })
  }

  handleSubmit (event) {
    event.preventDefault()
    window.location = `/summoners/${this.state.region}/${this.state.summoner}`
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="search-group">
          <input
            type="text"
            onChange={this.handleSummonerChange}
            className="input-summoner"
          />
          <select onChange={this.handleRegionChange} className="input-region">
            <option value="-1">Select a region</option>
            <option value="na">NA</option>
          </select>
        </div>

        <input type="submit" value="Get Summoner Stats" className="submit-search"/>
      </form>
    )
  }
}

export default Search
