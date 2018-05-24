import React from 'react'
import fetch from 'isomorphic-unfetch'

export default class Post extends React.Component {
  static async getInitialProps({ query }) {
    const res = await fetch(`https://api.tvmaze.com/shows/${query.id}`)
    const show = await res.json()

    console.log(`Fetched show: ${show.name}`)

    return { show }
  }

  render() {
    const { show } = this.props

    return <div>
      <h1>{show.name}</h1>
      <p>{show.summary.replace(/<[/]?p>/g, '')}</p>
      <img src={show.image.medium} />
    </div>
  }
}