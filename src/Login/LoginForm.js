import React, { Component } from 'react';
import {FormGroup, FormControl, HelpBlock, ControlLabel, Col, Button, Form} from 'react-bootstrap';
import UserProfile from '../Profile/UserProfile';
import {Link} from 'react-router-dom';

var axios = require('axios');

class LoginForm extends React.Component {
  state = {
    username: "",
    pwd: ""
  }

  usernameChange(e) {
      const value = e.target.value;
      this.setState({
          username: value
      })
  }

  pwdChange(e) {
      const value = e.target.value;
      this.setState({
          pwd: value
      })
  }

  login() {
    var _this = this
    var body = {
      Username: this.state.username,
      Password: this.state.pwd
    }
    this.serverRequest =
      axios
        .post('checkLogin', body).then(function(result) {
          var res = result.data.trim()
          console.log(res)
          if (res == "SUCCESS") {
            _this.proceedToProfile()
          } else {
            alert(res)
          }
        })
  }

  proceedToProfile() {
    UserProfile.setName(this.state.username)
    this.props.history.push('/profile')
  }

  usernameGroup() {
    return <FormGroup controlId="formHorizontal">
      <Col componentClass={ControlLabel} sm={2}>
        Username
      </Col>
      <Col sm={10}>
        <FormControl type="text" placeholder="Username" value={this.state.username}
          onChange={e => this.usernameChange(e)}/>
      </Col>
    </FormGroup>
  }

  passwordGroup() {
    return (<FormGroup controlId="formHorizontalPassword">
      <Col componentClass={ControlLabel} sm={2}>
        Password
      </Col>
      <Col sm={10}>
        <FormControl type="password" placeholder="Password" value={this.state.pwd}
          onChange={e => this.pwdChange(e)}/>
      </Col>
    </FormGroup>);
  }

  submitGroup() {
    return (<FormGroup>
        <Col smOffset={2} sm={10}>
          <Button type="submit">Sign in</Button>
        </Col>
    </FormGroup>)
  }

  render() {
    return (
      <div>
        <h2> Enter your details below to log in. </h2>
        <Form horizontal onSubmit={(e) => {this.login(); e.preventDefault();}}>
          {this.usernameGroup()}
          {this.passwordGroup()}
          {this.submitGroup()}
        </Form>
        <Link to="/newUser">Or create a new account here</Link>
      </div>
      );
  }
}

export default LoginForm;
