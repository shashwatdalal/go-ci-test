import React, { Component } from 'react';
import './Stylesheets/FixtureCard.css';

class FixtureCard extends Component {
  state = {
    id: -1,
    name: "",
    location: "",
    startTime: "",
    endTime: "",
    sport: "",
    upvotes: 0,
    downvotes: 0
  }

  constructor(props) {
    super(props);
    this.id = props.id;
    this.name = props.Name;
    this.location = props.Location;
    this.startTime = props.StartTime;
    this.endTime = props.EndTime;
    this.sport = props.Sport;
  }

  toggle_upvote() {
    // Write upvote to file, check if upvote already in file
    this.state.upvotes++;
  }


  toggle_downvote() {
    // Write downvote to file, check if upvote already in file
    this.state.downvotes++;
  }

  render() {
    return <div class="card">
        <div class="team"> {this.state.name} </div>
        <div class="venue">{this.state.location}</div>
        <div class="date"> {this.state.startTime + " to " + this.state.endTime}</div>
        <div class="sport">{this.state.sport}</div>
        <div class="upvote">
          <div class="arrow-up" onClick={() => this.toggle_upvote()}></div>
          {this.state.upvotes}
        </div>
        <div class="downvote">
          <div class="arrow-down" onClick={() => this.toggle_downvote()}></div>
          {this.state.upvotes}
        </div>
      </div>
  }
}


export default FixtureCard;
