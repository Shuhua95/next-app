import React from 'react'

export default class extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      items: [],
      text: ''
    }

    this.handleChange = (e) => {
      this.setState({
        text: e.target.value
      })
    }

    this.handleSubmit = (e) => {
      try {
        e.preventDefault()
      } catch (error) {}

      if (!this.state.text.length) return

      const newItem = {
        text: this.state.text,
        id: Date.now()
      }

      this.setState(prevState => ({
        items: prevState.items.concat(newItem),
        text: ''
      }))
    }

    this.handelDelete = (index) => {

      const items = this.state.items
      items.splice(index, 1)

      this.setState({
        items
      })
    }
  }

  render() {
    const {items, text} = this.state
    return <form>
      <h1>Todo List</h1>
      <TodoList items={items} del={this.handelDelete} />
      <input type="text" onChange={this.handleChange} value={text} onKeyDown={(e) => {console.log(e.keyCode);e.keyCode === 13 && this.handleSubmit()}}/>
      <button onClick={this.handleSubmit}>add #{items.length + 1}</button>
      <style jsx>{`
        display: flex;
        flex-flow: column wrap;
        align-items: center;
      `}</style>
    </form>
  }
}

class TodoList extends React.Component {
  render() {
    const { items, del } = this.props
    return <ul>
      {items.map((item, index) => <li key={item.id} onClick={() => del(index)}>{item.text}</li>)}
      <style jsx>{`
        ul {
          margin: 20px 0;
          list-style: decimal;
        }
        li {
          font-size: 20px;
          line-height: 1.5
        }
      `}</style>
    </ul>
  }
}