// import './Stylesheets/Login.css';
import React, { Component } from 'react';
import UserProfile from '../Profile/UserProfile';
import NewUserForm from './NewUserForm'
import LoginForm from './LoginForm'

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
      <h2>Returning User Login</h2>
      <LoginForm />
      <h2>Or create a new user</h2>
      <NewUserForm />
    </div>
  )}
}

export default Login;
