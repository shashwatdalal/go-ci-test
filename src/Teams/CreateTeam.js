import React, {Component} from 'react';
import QueryResultCard from './QueryResultCard'
import UserProfile from '../Profile/UserProfile'
import ActiveUserID from '../Profile/ActiveUserID'
import './Stylesheets/CreateTeam.css'
import {FormControl, ListGroup, ListGroupItem, Button, CustomComponent} from 'react-bootstrap';

var axios = require('axios');

class CreateTeam extends Component {

  state = {
    invitees: [],
    query: "",
    query_results: [],
    team_name: ""
  }

  getQueryResults() {
    var _this = this;
    if (this.state.query.length === 0) {
      _this.setState({
        query_results: []
      })
      return
    }
    var req = "/getUsernameMatches?pattern=" + this.state.query
    this.serverRequest = axios.get(req)
        .then(function (result) {
          if (result.data != null) {
            var relevant_results = result.data.filter((res) => res.UserID !== ActiveUserID.getID())
            _this.setState({query_results: result.data});
          } else {
            _this.setState({query_results: []});
          }
        })
  }

  inputChange(e) {
   const value = e.target.value;
   var _this = this;
   this.setState({
     query: value
   }, _this.getQueryResults())
  }

  teamInputChange(e) {
   const value = e.target.value;
   var _this = this;
   this.setState({
     team_name: value
   })
  }

  removeChild(user_id) {
    var _this = this
    this.setState({
      query_results : _this.state.filter(item => item.UserID != user_id)
    })
  }

  addInvitee(inv){
    var _this = this
    var matches = this.state.invitees.filter(_inv => _inv.UserID === inv.UserID)
    if (matches.length > 0) {
      return
    }
    this.setState({
      invitees: [..._this.state.invitees, inv],
      query: "",
      query_results: []
    })
  }

  removeInvitee(inv){
    var _this = this
    this.setState({
      invitees: _this.state.invitees.filter(_inv => _inv.Username !== inv.Username)
    })
  }

  inviteeListItem(inv) {
    var _this = this
    const username = inv.Username
    return (<div class="inviteeComponent">
        <div class="inviteeUsername">{"ID: " + username}</div>
        <div class="inviteeName">{"Name: " + inv.FullName}</div>
        <Button onClick={() => this.removeInvitee(inv)}>Remove</Button>
      </div>)
  }

  queryListItem(res) {
    return (<ListGroupItem onClick={() => this.addInvitee(res)}
      header={"ID: " + res.Username}>{"Name: " + res.FullName}</ListGroupItem>
    )
  }

  create() {
    var _this = this
    var invitees = this.state.invitees.map(inv => inv.UserID)
    var teamInfo = {
      TeamName:this.state.team_name,
      Captain:ActiveUserID.getID(),
      Invitees:invitees
    }
    axios.post("/createTeam", teamInfo)
      .then(function(response){
        if (response.data) {
          _this.props.history.push("/chat")
        } else {
          alert("Team name not unique")
        }
      });
  }

  render() {
    var _this = this
    return (
        <div class="CreateTeam">
          <div id="teamNameSection">
            <h2>Team Name</h2>
            <input
              id="TeamNameBox"
              type="text"
              value={this.state.team_name}
              placeholder="Enter team name"
              onChange={e => this.teamInputChange(e)}
            />
          </div>
          <div id="invitationSection">
            <h2>Invitations will be sent to the following</h2>
            {(this.state.invitees.length === 0) ? "No users selected, search below" :
              (<ListGroup>
                {this.state.invitees
                  .map(inv => _this.inviteeListItem(inv))}
                </ListGroup>)}
            <div id="searchSection">
              <h3>User Search</h3>
              <input
                id="SearchBox"
                placeholder="Search by username"
                ref={input => this.search = input}
                onChange={e => this.inputChange(e)}
                value={this.state.query}
              />
              <ListGroup>
                {this.state.query_results
                  .map(res => _this.queryListItem(res))}
              </ListGroup>
            </div>

            <Button onClick={() => this.create()}>Create Team and Send Invites</Button>
          </div>
        </div>
    );
  }


}

export default CreateTeam
