import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${props => (props.primary ? 'palevioletred' : 'white')};
  color: ${props => (props.primary ? 'white' : 'palevioletred')};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`

const TomatoButton = styled(Button)`
  color: tomato;
  border-color: tomato;
`

function Hooks() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    document.title = `you clicked ${count} times`
  })

  return (
    <React.Fragment>
      <Button primary onClick={() => setCount(count + 1)}>
        {count ? `you clicked ${count} times` : 'Click me'}
      </Button>
      <Button onClick={() => setCount(count + 1)}>
        {count ? `you clicked ${count} times` : 'Click me'}
      </Button>
      <TomatoButton>TomatoButton</TomatoButton>
      <TomatoButton as="a" href="/">TomatoButton as a</TomatoButton>
    </React.Fragment>
  )
}

export default Hooks
