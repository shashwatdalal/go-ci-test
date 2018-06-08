import React, { Component } from 'react';
import {FormGroup, FormControl, HelpBlock, ControlLabel} from 'react-bootstrap';

class NewUserForm extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleFullNameChange = this.handleFullNameChange.bind(this);

    this.state = {
      username: "",
      full_name: "",
      age: -1,
      location: ""
    };
  }

  getUsernameValidationState() {
    const length = this.state.username.length;
    if (length > 5 && length < 30) return 'success';
    else if (length > 0) return 'error';
    return null;
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  getFullNameValidationState() {
    const length = this.state.full_name.length;
    if (length > 5 && length < 30) return 'success';
    else if (length > 0) return 'error';
    return null;
  }

  handleFullNameChange(e) {
    this.setState({ full_name: e.target.value });
  }

  usernameGroup() {
    return <FormGroup
      controlId="Username"
      validationState={this.getUsernameValidationState()}
    >
      <ControlLabel>Username</ControlLabel>
      <FormControl
        type="text"
        value={this.state.username}
        placeholder="Enter username"
        onChange={this.handleUsernameChange}
      />
      <FormControl.Feedback />
      <HelpBlock>Validation is based on string length.</HelpBlock>
    </FormGroup>
  }

  fullNameGroup() {
    return <FormGroup
      controlId="newUserForm"
      validationState={this.getFullNameValidationState()}
    >
      <ControlLabel>Full Name</ControlLabel>
      <FormControl
        type="text"
        value={this.state.full_name}
        placeholder="Enter full name"
        onChange={this.handleFullNameChange}
      />
      <FormControl.Feedback />
      <HelpBlock>Validation is based on string length.</HelpBlock>
    </FormGroup>

  }

  render() {
    return (
      <form>
        {this.usernameGroup()}
        {this.fullNameGroup()}
      </form>
    );
  }
}

export default NewUserForm;
