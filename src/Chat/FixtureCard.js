import React, {Component} from 'react';
import './Stylesheets/FixtureCard.css';
import ActiveUserID from '../Profile/ActiveUserID'
import {Button} from 'react-bootstrap'

var axios = require('axios');
var moment = require('moment');

class FixtureCard extends Component {
  state = {
    players: [],
    location: "Failed to Find",
    upvotes: 3,
    downvotes: 0,
    upvoted: false,
    downvoted: false
  }

  componentDidMount() {
    var request_url = "http://maps.googleapis.com/maps/api/geocode/json?latlng="
                      + this.props.data.LocLat + "," + this.props.data.LocLng

    var _this = this
    axios.get(request_url)
          .then(function(result) {
            // console.log(result);
            _this.setState({location: result.data.results[0].formatted_address});
          })

    var upvote_req = "getUpvoteTally?team_id=" + this.props.team_id
                      + "&fixture_id=" + this.props.data.AdID
    axios.get(upvote_req)
          .then(function(result) {
            _this.setState({upvotes: parseInt(result.data)})
          })

    var downvote_req = "getDownvoteTally?team_id=" + this.props.team_id
                      + "&fixture_id=" + this.props.data.AdID
    axios.get(downvote_req)
          .then(function(result) {
            _this.setState({downvotes: parseInt(result.data)})
          })

    var vote_status_req = "getVoteStatus?user_id=" + ActiveUserID.getID()
                      + "&team_id=" + this.props.team_id
                      + "&fixture_id=" + this.props.data.AdID
    axios.get(vote_status_req)
          .then(function(result) {
            // console.log(result);
            switch (result.data.trim()) {
              case "upvote":
                _this.setState({
                  upvoted: true
                })
                break;
              case "downvote":
                _this.setState({
                  downvoted: true
                })
              default:
            }
          })

  }

  toggle_upvote() {
    var vote = {
      UserID:     ActiveUserID.getID(),
      TeamID:     this.props.team_id,
      AdvertID:   this.props.data.AdID
    }

    if (this.state.downvoted) {
      axios.post("/addUpvote", vote)
      axios.post("/removeDownvote", vote)
      this.setState({
        downvotes: this.state.downvotes - 1,
        upvotes: this.state.upvotes + 1,
        upvoted: true,
        downvoted: false
      })
    } else if (this.state.upvoted) {
      axios.post("/removeUpvote", vote)
      this.setState({
        upvotes: this.state.upvotes - 1,
        upvoted: false
      })
    } else {
      axios.post("/addUpvote", vote)
      this.setState({
        upvotes: this.state.upvotes + 1,
        upvoted: true
      })
    }
  }

  toggle_downvote() {
    var vote = {
      UserID:     ActiveUserID.getID(),
      TeamID:     this.props.team_id,
      AdvertID:   this.props.data.AdID
    }

    if (this.state.upvoted) {
      axios.post("/addDownvote", vote)
      axios.post("/removeUpvote", vote)
      this.setState({
        upvotes: this.state.upvotes - 1,
        downvotes: this.state.downvotes + 1,
        upvoted: false,
        downvoted: true
      })
    } else if (this.state.downvoted) {
      axios.post("/removeDownvote", vote)
      this.setState({
        downvotes: this.state.downvotes - 1,
        downvoted: false
      })
    } else {
      axios.post("/addDownvote", vote)
      this.setState({
        downvotes: this.state.downvotes + 1,
        downvoted: true
      })
    }
  }

  pretty_date(date) {
    var day = moment(date)
    console.log(day)
    return day.format("dddd, MMMM Do YYYY, H:mm")
  }

  fixture_time(start, end){
    return <div><strong> {this.pretty_date(start)} </strong></div>;
  }

  location_link() {
    return "http://maps.google.com/maps?q=" + this.props.data.LocLat + "," + this.props.data.LocLng
  }

  accept_fixture() {
    var acceptance = {
      AccepterID : this.props.team_id,
    	AdID			 : this.props.data.AdID,
      HostID     : Number(this.props.data.TeamID),
    	StartTime  : this.props.data.StartTime,
    	LocLat	 	 : this.props.data.LocLat,
    	LocLng	 	 : this.props.data.LocLng,
    	Sport   	 : this.props.data.Sport
    }
    var _this = this;
    axios.post("/acceptAdvert", acceptance)
          .then(function(result) {
            _this.props.remove_fixture(_this.props.data.AdID)
          })
  }

  render() {
    return (
      <div class="card">
        <div class="game-brief">
          {this.props.data.NumPlayers}-a-side {this.props.data.Sport} vs
          <div class="team-name">
            {this.props.data.Name}
          </div>
        </div>

        <div class="venue">
          Venue: <br/>
          <a href={this.location_link()} target="_blank">{this.state.location}</a>
        </div>

        <div class="date"> Time: <br/>
          {this.fixture_time(this.props.data.StartTime, this.props.data.EndTime)}
        </div>

        <Button class="accept" onClick={() => this.accept_fixture()}>Accept Ad and Chat to Opposition</Button>

        <div class="voting">
          <div class="voting-header">
            {"Let your friends know if you're available by voting below"}
          </div>

          <table class="votetable">
            <tr>
              <td class={"votecell " + (this.state.upvoted ? 'vote-up-selected': 'vote-up')}
                onClick={() => this.toggle_upvote()}>
                <h3 id="preftext">{"(" + this.state.upvotes + ") Can Play"}</h3>
              </td>

              <td class="separatorcell"></td>

              <td class={"votecell " + (this.state.downvoted ? 'vote-down-selected': 'vote-down')}
                onClick={() => this.toggle_downvote()}>
                <h3 id="preftext">{"(" + this.state.downvotes + ") Busy"}</h3>
              </td>
            </tr>
          </table>

        </div>

      </div>
    )
  }
}


export default FixtureCard;
