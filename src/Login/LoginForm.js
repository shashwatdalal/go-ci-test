import React, { Component } from 'react';
import {FormGroup, FormControl, HelpBlock, ControlLabel, Col, Button, Form} from 'react-bootstrap';
import UserProfile from '../Profile/UserProfile';

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
    alert("Called Login");
    var _this = this
    var req = "checkLogin?username=" + this.state.username + "&pwd=" + this.state.pwd
    this.serverRequest =
      axios
        .get(req).then(function(result) {
          if (result.data === "SUCCESS") {
            UserProfile.setName(_this.state.username)
            _this.props.history.push('/profile')
          } else {
            alert(result.data)
          }
        })

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
      <Form horizontal onSubmit={(e) => {this.login(); e.preventDefault();}}>
        {this.usernameGroup()}
        {this.passwordGroup()}
        {this.submitGroup()}
      </Form>
      );
  }
}

export default LoginForm;
