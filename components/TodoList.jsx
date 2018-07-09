import React from 'react'
import styled from 'styled-components'

const Form = styled.form`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
`

const Ul = styled.ul`
  margin: 20px 0;
  list-style: decimal;
`

const Li = styled.li`
  font-size: 20px;
  line-height: 1.5;
`

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
      } catch (error) { }

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
    const { items, text } = this.state
    return <Form>
      <h1>Todo List</h1>
      <TodoList items={items} del={this.handelDelete} />
      <input type="text" onChange={this.handleChange} value={text} onKeyDown={(e) => { console.log(e.keyCode); e.keyCode === 13 && this.handleSubmit() }} />
      <button onClick={this.handleSubmit}>add #{items.length + 1}</button>
    </Form>
  }
}

class TodoList extends React.Component {
  render() {
    const { items, del } = this.props
    return <Ul>
      {items.map((item, index) => <Li key={item.id} onClick={() => del(index)}>{item.text}</Li>)}
    </Ul>
  }
}