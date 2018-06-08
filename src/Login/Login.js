// import './Stylesheets/Login.css';
import React, { Component } from 'react';
import UserProfile from '../Profile/UserProfile';
import NewUserForm from './NewUserForm'

class Login extends Component {
  state = {
    username: ""
  }

  inputChange(e) {
    const value = e.target.value;
    this.setState({
      username: value
    })
  }

  login() {
    UserProfile.setName(this.state.username)
    this.props.history.push('/profile')
  }

  render() { return (
    <div class="login_wrapper">
      <h2>Enter Username</h2>
      <div class="UsernameEntry">
        <input
          id="usernameEntry"
          type="text"
          value={this.state.username}
          onChange={e => this.inputChange(e)}
          onKeyPress={event => {
              if (event.key === 'Enter') {
                this.login()
              }
            }}/>
          <button class="SendButton" onClick={() => this.login()}>Sign in</button>
      </div>
      <h2>Or create a new user</h2>
      <NewUserForm />
    </div>
  )}
}


export default Login;
