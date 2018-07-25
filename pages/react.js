import React from 'react'
import TodoList from '../components/TodoList'
import TemperatureInput from '../components/TemperatureInput'
import FilterableProductTable from '../components/FilterableProductTable'
import SmoothRolling from '../static/smoothRolling'

export default class extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isGoing: true,
      radio: false,
      numberOfGuests: 2,
      temperature: '',
      scale: 'c',
      textarea: '',
      select: 'coconut'
    }
  }

  componentDidMount() {
    const smoothRolling = new SmoothRolling()
    smoothRolling.init()
  }

  handleInputChange = e => {
    const target = e.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  handleCelsiusChange = temperature => {
    this.setState({scale: 'c', temperature});
  }

  handleFahrenheitChange = temperature => {
    this.setState({scale: 'f', temperature});
  }

  handleSubmit = e => {
    e.preventDefault()
    console.log(this.input.value)
  }

  render() {
    const { scale, temperature, textarea, select } = this.state
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature

    return <>
      <TodoList />

      <form onSubmit={this.handleSubmit}>
        <label>
          Is going:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />

        <label>
          Number of guests:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
        <br />

        <label>
          Name:
          <textarea placeholder="Please write an essay about your favorite DOM element." name="textarea" value={textarea} onChange={this.handleInputChange}></textarea>
        </label>
        <br />

        <select value={select} name="select" onChange={this.handleInputChange}>
          <option value="grapefruit">Grapefruit</option>
          <option value="lime">Lime</option>
          <option value="coconut">Coconut</option>
          <option value="mango">Mango</option>
        </select>
        <br />

        <input type="file" ref={(input) => this.input = input}/>

        <button>Submit</button>
      </form>

      <TemperatureInput 
        scale='c'
        temperature={celsius}
        onTemperatureChange={this.handleCelsiusChange}
      />

      <TemperatureInput 
        scale='f'
        temperature={fahrenheit}
        onTemperatureChange={this.handleFahrenheitChange}
      />

      <BoilingVerdict celsius={parseFloat(celsius)} />

      <FilterableProductTable />
    </>
  }
}

function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}