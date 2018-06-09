import React, { Component } from 'react';
import {FormGroup, FormControl, HelpBlock, ControlLabel, Col, Button, Form} from 'react-bootstrap';
import UserProfile from '../Profile/UserProfile';
import StandaloneSearchBox from "react-google-maps/lib/components/places/StandaloneSearchBox";
import LocationPicker from 'react-location-picker';

const defaultPosition = {
    lat: 51.509865,
    lng: -0.118092
};

const refs = {}

var axios = require('axios');

class NewUserForm extends Component {
  state = {
     username: "",
     full_name: "",
     dob: "",
     position: defaultPosition,
     pwd: "",
     pwd2: ""
  }

  constructor(props) {
      super(props);
      this.state = {
         username: "",
         full_name: "",
         dob: "",
         position: defaultPosition,
         pwd: "",
         pwd2: ""
      }

      this.handleLocationChange = this.handleLocationChange.bind(this);
      this.onPlacesChanged = this.onPlacesChanged.bind(this);
      this.onSearchBoxMounted = this.onSearchBoxMounted.bind(this);
  }

  //Map
  handleLocationChange({position, address}) {
      this.setState({position, address});
  }
  onSearchBoxMounted(ref) {
      refs.searchBox = ref;
  }
  onPlacesChanged(){
      const places = refs.searchBox.getPlaces();
      this.setState({ places,});
      var lastvisited = places[places.length - 1];

      var object = {
          position: {
              lat: lastvisited.geometry.location.lat(),
              lng: lastvisited.geometry.location.lng(),
          },
          address: lastvisited.formatted_address
      };
      this.setState(object);
  }


  //Text entry validation
  getUsernameValidationState() {
    const length = this.state.username.length;
    if (length > 0 && length < 30) return 'success';
    else if (length > 0) return 'error';
    return null;
  }
  getFullNameValidationState() {
    const length = this.state.full_name.length;
    if (length > 0 && length < 30) return 'success';
    else if (length > 0) return 'error';
    return null;
  }
  getDobValidationState() {
    const length = this.state.dob.length;
    if (length === 10) return 'success';
    else if (length > 0) return 'error';
    return null;
  }
  getPasswordValidationState() {
    const length = this.state.pwd.length;
    if (length >= 8 && length < 30) return 'success';
    else if (length > 0) return 'error';
    return null;
  }
  getPasswordResubmitValidationState() {
    const length = this.state.pwd2.length;
    if (length > 0 && (this.state.pwd === this.state.pwd2)) return 'success';
    else if (length > 0) return 'error';
    return null;
  }

  // Text Box Change Handlers
  usernameChange(e) {
    const value = e.target.value;
    this.setState({
        username: value
    })
  }
  fullNameChange(e) {
    const value = e.target.value;
    this.setState({
        full_name: value
    })
  }
  dobChange(e) {
    const value = e.target.value;
    this.setState({
        dob: value
    })
  }
  pwdChange(e) {
    const value = e.target.value;
    this.setState({
        pwd: value
    })
  }
  pwd2Change(e) {
      const value = e.target.value;
      this.setState({
          pwd2: value
      })
  }

  // Form components
  usernameGroup() {
    return <FormGroup controlId="formHorizontalUsername"
            validationState={this.getUsernameValidationState()}>
      <Col componentClass={ControlLabel} sm={2}>
        Username
      </Col>
      <Col sm={10}>
        <FormControl type="text" placeholder="Username" value={this.state.username}
          onChange={e => this.usernameChange(e)}/>
            <FormControl.Feedback />
            <HelpBlock>Validation is based on whether username is unique.</HelpBlock>
      </Col>
    </FormGroup>
  }
  fullNameGroup() {
    return <FormGroup controlId="formHorizontalFullName"
            validationState={this.getFullNameValidationState()}>
      <Col componentClass={ControlLabel} sm={2}>
        Full Name
      </Col>
      <Col sm={10}>
        <FormControl type="text" placeholder="Enter Full Name" value={this.state.full_name}
          onChange={e => this.fullNameChange(e)}/>
            <FormControl.Feedback />
            <HelpBlock>Validation is based on string length.</HelpBlock>
      </Col>
    </FormGroup>
  }
  dobGroup() {
    return <FormGroup controlId="formHorizontalDOB"
            validationState={this.getDobValidationState()}>
      <Col componentClass={ControlLabel} sm={2}>
        Date Of Birth
      </Col>
      <Col sm={10}>
        <FormControl type="date" value={this.state.dob}
          onChange={e => this.dobChange(e)}/>
            <FormControl.Feedback />
            <HelpBlock>Date must be of from DD/MM/YYYY.</HelpBlock>
      </Col>
    </FormGroup>
  }
  locationGroup() {
    return <FormGroup controlId="formHorizontalLocation">
      <Col componentClass={ControlLabel} sm={2}>
        Location
      </Col>
      <Col sm={10}>
      <StandaloneSearchBox
        ref={this.onSearchBoxMounted}
        bounds={this.bounds}
        onPlacesChanged={this.onPlacesChanged}
      >
      <input
        type="text"
        placeholder="Search for your location"
        onKeyPress={event => {
            if (event.key === 'Enter') {
              this.onPlacesChanged()
              alert("In key press")
              event.preventDefault()
            }
          }}
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `99%`,
          height: `32px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
        }}
      />
      </StandaloneSearchBox>
      <br />
        <LocationPicker
          name='Location'
          id='input2'
          value={this.state.position}
          containerElement={ <div style={ {height: '100%'} }/> }
          mapElement={ <div style={ {height: '400px'} }/> }
          defaultPosition={this.state.position}
          onChange={this.handleLocationChange} />
        <br />
      </Col>
    </FormGroup>
  }
  passwordGroup() {
    return (<FormGroup controlId="formHorizontalPassword"
            validationState={this.getPasswordValidationState()}>
      <Col componentClass={ControlLabel} sm={2}>
        Password
      </Col>
      <Col sm={10}>
        <FormControl type="password" placeholder="Password" value={this.state.pwd}
          onChange={e => this.pwdChange(e)}/>
        <FormControl.Feedback />
        <HelpBlock>Passwords must be at least 8 characters.</HelpBlock>
      </Col>
    </FormGroup>);
  }
  resubmitPasswordGroup() {
    return (<FormGroup controlId="formHorizontalPassword2"
            validationState={this.getPasswordResubmitValidationState()}>
      <Col componentClass={ControlLabel} sm={2}>
        Re-submit Password
      </Col>
      <Col sm={10}>
        <FormControl type="password" placeholder="Password" value={this.state.pwd2}
          onChange={e => this.pwd2Change(e)}/>
          <FormControl.Feedback />
          <HelpBlock>Passwords must match</HelpBlock>
      </Col>
    </FormGroup>);
  }
  submitGroup() {
    return (<FormGroup>
        <Col smOffset={2} sm={10}>
          <Button type="submit">Create User</Button>
        </Col>
    </FormGroup>)
  }

  // Form Submission
  create() {
    alert("Create Called");
    var _this = this;
    if (this.getUsernameValidationState() !== 'success') {
      alert("Resolve issue with username.")
    } else if (this.getFullNameValidationState() !== 'success') {
      alert("Resolve issue with name.")
    } else if (this.getDobValidationState() !== 'success') {
      alert("Resolve issue with date of birth.")
    } else if (this.getPasswordValidationState() !== 'success') {
      alert("Resolve issue with password.")
    } else if (this.getUsernameValidationState() !== 'success') {
      alert("Ensure passwords match.")
    } else {
      alert("All states valid")
      var body = {
        username: this.state.username,
        full_name: this.state.full_name,
        dob: this.state.dob,
        position: this.state.position,
        pwd: this.state.pwd
      }
      var req = "adduser?username=" + this.state.username + "&pwd=" + this.state.pwd
      this.serverRequest =
        axios
          .post(req, body).then(function(result) {
            if (result.data === "SUCCESS") {
              UserProfile.setName(_this.state.username)
              _this.props.history.push('/profile')
            } else {
              alert(result.data)
            }
          })
      }
  }

  render() {
    return (
      <Form horizontal onSubmit={(e) => {this.create(); e.preventDefault();}}>
        {this.fullNameGroup()}
        {this.usernameGroup()}
        {this.dobGroup()}
        {this.locationGroup()}
        {this.passwordGroup()}
        {this.resubmitPasswordGroup()}
        {this.submitGroup()}
      </Form>
      );
  }
}

export default NewUserForm;
