import React, { Component } from 'react'

class Search extends Component {
  constructor (props) {
    super(props)

    this.state = { summoner: '', region: 'na' }

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
      <form className='search-form' onSubmit={this.handleSubmit}>
        <input
          type='text'
          onChange={this.handleSummonerChange}
          className='input-summoner'
          placeholder='Enter a summoner name'
        />

        <button className='search-button' type='submit' >
          <i className='fa fa-search search-icon' aria-hidden='true' />
        </button>

        <select onChange={this.handleRegionChange} defaultValue='na' className='input-region'>
          <option value='na'>NA</option>
        </select>
      </form>
    )
  }
}

export default Search
