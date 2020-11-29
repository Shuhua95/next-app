import React from 'react'

const LoginButton = props => <button onClick={props.onClick}>Login</button>
const LogoutButton = props => <button onClick={props.onClick}>Logout</button>

export default class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: true,
      isLoggedIn: false,
    };

    /* this.handleClick = this.handleClick.bind(this); */
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }))
  }

  /* handleClick = () => {
    console.log('this is:', this)
  } */

  handleShowThis(id, e) {
    console.log(`this:${this}\nid:${id}\nevent:${e}`)
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }
  

  render() {
    const { isLoggedIn } = this.state
    return (
      <React.Fragment>
        <button onClick={this.handleClick.bind(this)}>
          {this.state.isToggleOn ? 'ON' : 'OFF'}
        </button>

        {
          [...Array(10).keys()].map(item =>
            <button key={item} onClick={this.handleShowThis.bind(this, item)}>
              show this({item})
            </button>
          )
        }

        {
          isLoggedIn ?
          <LogoutButton onClick={this.handleLogoutClick.bind(this)}></LogoutButton> :
          <LoginButton onClick={this.handleLoginClick.bind(this)}></LoginButton>
        }
      </React.Fragment>
    )
  }
}