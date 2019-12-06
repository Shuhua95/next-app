import React from 'react'

export default class Clock extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      date: new Date()
    }
  }

  componentDidMount() {
    this.timer = setInterval(this.tick.bind(this), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  tick() {
    this.setState({
      date: new Date()
    })
  }

  render() {
    return <React.Fragment>
      <h1>Hello world</h1>
      <h2>It is: { this.state.date.toLocaleTimeString() }</h2>
    </React.Fragment>
  }
}